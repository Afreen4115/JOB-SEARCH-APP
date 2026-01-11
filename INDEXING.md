# Database Indexing Strategy for HireHub

## Overview

This document explains how database indexing is implemented in the HireHub job search platform to optimize query performance.

## Current Indexing State

### Automatic Indexes (Created by PostgreSQL)

PostgreSQL automatically creates indexes for:

1. **PRIMARY KEY constraints:**
   - `users.user_id`
   - `jobs.job_id`
   - `companies.company_id`
   - `applications.application_id`
   - `skills.skill_id`

2. **UNIQUE constraints:**
   - `users.email` (UNIQUE)
   - `companies.name` (UNIQUE)
   - `skills.name` (UNIQUE)
   - `applications(job_id, applicant_id)` (composite UNIQUE)

3. **Composite PRIMARY KEY:**
   - `user_skills(user_id, skill_id)`

### Manual Indexes (Added by Migration Scripts)

We've added performance indexes to optimize frequently used queries:

#### Jobs Table Indexes

```sql
-- Filter active jobs (used in getAllActiveJobs)
idx_jobs_is_active ON jobs(is_active) WHERE is_active = true

-- Join with companies
idx_jobs_company_id ON jobs(company_id)

-- Filter jobs by recruiter
idx_jobs_posted_by_recruiter ON jobs(posted_by_recuriter_id)

-- Sort by creation date
idx_jobs_created_at ON jobs(created_at DESC)

-- Text search on job title (ILIKE queries)
idx_jobs_title_trgm ON jobs USING gin(title gin_trgm_ops)

-- Text search on location (ILIKE queries)
idx_jobs_location_trgm ON jobs USING gin(location gin_trgm_ops)

-- Composite index for common query pattern
idx_jobs_active_created ON jobs(is_active, created_at DESC) WHERE is_active = true
```

#### Companies Table Indexes

```sql
-- Filter companies by recruiter
idx_companies_recruiter_id ON companies(recruiter_id)
```

#### Applications Table Indexes

```sql
-- Filter applications by job
idx_applications_job_id ON applications(job_id)

-- Filter applications by applicant
idx_applications_applicant_id ON applications(applicant_id)

-- Sort applications by application date
idx_applications_applied_at ON applications(applied_at DESC)

-- Filter premium subscribers
idx_applications_subscribed ON applications(subscribed) WHERE subscribed = true

-- Composite index for application listing query
idx_applications_job_subscribed_applied ON applications(job_id, subscribed DESC, applied_at ASC)
```

#### User_Skills Table Indexes

```sql
-- Filter user skills by user
idx_user_skills_user_id ON user_skills(user_id)

-- Filter user skills by skill
idx_user_skills_skill_id ON user_skills(skill_id)
```

#### Users Table Indexes

```sql
-- Filter users by role
idx_users_role ON users(role)
```

## Index Types Used

### 1. B-tree Indexes (Default)
- Standard indexes for equality and range queries
- Used for: PRIMARY KEY, UNIQUE, foreign keys, simple filtering

### 2. GIN Indexes (Generalized Inverted Index)
- Used for full-text search and pattern matching
- **Requires `pg_trgm` extension** for trigram similarity
- Used for: `ILIKE` queries on `jobs.title` and `jobs.location`
- Example query optimized:
  ```sql
  SELECT * FROM jobs WHERE title ILIKE '%software%'
  ```

### 3. Partial Indexes
- Index only a subset of rows
- Smaller size, faster queries
- Used for: `is_active = true` jobs, `subscribed = true` applications

### 4. Composite Indexes
- Index on multiple columns
- Optimizes queries filtering/sorting on multiple columns
- Used for: `(is_active, created_at)`, `(job_id, subscribed, applied_at)`

## Query Performance Impact

### Before Indexing

**Query: Get all active jobs with title filter**
```sql
SELECT * FROM jobs 
WHERE is_active = true 
AND title ILIKE '%developer%'
ORDER BY created_at DESC;
```
- **Execution:** Full table scan
- **Performance:** O(n) - scans all rows

### After Indexing

Same query now uses:
- `idx_jobs_is_active` - quickly filters active jobs
- `idx_jobs_title_trgm` - fast pattern matching on title
- `idx_jobs_created_at` - efficient sorting
- **Performance:** O(log n) - logarithmic search time

**Expected Improvement:** 10x - 1000x faster depending on data size

## How Indexing Works in This Project

### 1. Migration Scripts

Indexes are added via migration scripts in each service:

- **Job Service:** `services/job/src/utils/addIndexes.ts`
- **Auth Service:** `services/auth/src/utils/addIndexes.ts`

### 2. Automatic Execution

Indexes are created automatically when services start:

```typescript
// In services/job/src/index.ts
async function initDb() {
    // ... create tables ...
    await initIndexes(); // Adds indexes after table creation
}
```

### 3. Extension Requirements

The `pg_trgm` extension is required for GIN text search indexes:

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;
```

This extension enables trigram-based text similarity matching, optimizing `ILIKE` queries.

## Monitoring Index Usage

To check if indexes are being used, query PostgreSQL system tables:

```sql
-- Check index usage statistics
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan as index_scans,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
```

## Best Practices

### 1. When to Create Indexes

✅ **Create indexes for:**
- Columns used in WHERE clauses frequently
- Columns used in JOIN conditions (foreign keys)
- Columns used in ORDER BY clauses
- Columns used in search operations (ILIKE, LIKE)
- Composite indexes for multi-column queries

❌ **Avoid indexes for:**
- Tables with frequent writes but few reads
- Columns with very low cardinality (few distinct values)
- Columns rarely used in queries
- Tables that are frequently truncated

### 2. Index Maintenance

PostgreSQL automatically maintains indexes, but you may want to:

```sql
-- Analyze tables to update statistics
ANALYZE jobs;
ANALYZE applications;

-- Rebuild indexes if needed (rarely required)
REINDEX TABLE jobs;
```

### 3. Index Size Considerations

- Indexes use disk space
- Each index adds overhead to INSERT/UPDATE/DELETE operations
- Monitor index size:

```sql
SELECT 
    tablename,
    indexname,
    pg_size_pretty(pg_relation_size(indexrelid)) AS index_size
FROM pg_stat_user_indexes
ORDER BY pg_relation_size(indexrelid) DESC;
```

## Redis Caching (Alternative/Complement to Indexing)

While database indexes optimize query execution, **Redis caching** can further improve performance:

### Current State
- Redis is connected but not actively used for query caching
- Could be implemented for:
  - Job listings (cache for 5-10 minutes)
  - User profiles (cache for 1-5 minutes)
  - Company details (cache for 10-30 minutes)

### Implementation Example

```typescript
// Cache job listings
const cacheKey = `jobs:active:${title}:${location}`;
const cached = await redisClient.get(cacheKey);
if (cached) return JSON.parse(cached);

// Query database (uses indexes)
const jobs = await sql`SELECT * FROM jobs ...`;

// Cache for 5 minutes
await redisClient.setEx(cacheKey, 300, JSON.stringify(jobs));
```

## Summary

**Indexing Strategy:**
1. ✅ Automatic indexes on PRIMARY KEY and UNIQUE constraints
2. ✅ Manual indexes on frequently queried columns
3. ✅ GIN indexes for text search (ILIKE queries)
4. ✅ Partial indexes for filtered subsets
5. ✅ Composite indexes for multi-column queries

**Performance Benefits:**
- Faster job searches (title, location filtering)
- Optimized application queries
- Efficient sorting and filtering
- Better join performance

**Next Steps:**
- Monitor index usage in production
- Add Redis caching for frequently accessed data
- Consider full-text search indexes if search requirements grow
- Review and optimize indexes based on actual query patterns

