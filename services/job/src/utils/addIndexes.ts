import { sql } from "./db.js";

/**
 * Database Indexing Migration
 * 
 * This script adds performance indexes to optimize query performance.
 * Run this after the initial database setup.
 * 
 * Indexes improve:
 * - Job search queries (title, location filtering)
 * - Filtering by is_active, company_id, recruiter_id
 * - Application queries by job_id, applicant_id
 * - Sorting by created_at, applied_at
 */

export async function addDatabaseIndexes() {
    try {
        console.log("🔍 Starting database indexing...");

        // Enable pg_trgm extension for fuzzy text search (ILIKE optimization)
        await sql`
            CREATE EXTENSION IF NOT EXISTS pg_trgm;
        `;
        console.log("✅ pg_trgm extension enabled");

        // Jobs table indexes
        await sql`
            CREATE INDEX IF NOT EXISTS idx_jobs_is_active 
            ON jobs(is_active) 
            WHERE is_active = true;
        `;
        console.log("✅ Created index: idx_jobs_is_active");

        await sql`
            CREATE INDEX IF NOT EXISTS idx_jobs_company_id 
            ON jobs(company_id);
        `;
        console.log("✅ Created index: idx_jobs_company_id");

        await sql`
            CREATE INDEX IF NOT EXISTS idx_jobs_posted_by_recruiter 
            ON jobs(posted_by_recuriter_id);
        `;
        console.log("✅ Created index: idx_jobs_posted_by_recruiter");

        await sql`
            CREATE INDEX IF NOT EXISTS idx_jobs_created_at 
            ON jobs(created_at DESC);
        `;
        console.log("✅ Created index: idx_jobs_created_at");

        // GIN indexes for text search (ILIKE) - requires pg_trgm extension
        await sql`
            CREATE INDEX IF NOT EXISTS idx_jobs_title_trgm 
            ON jobs USING gin(title gin_trgm_ops);
        `;
        console.log("✅ Created index: idx_jobs_title_trgm (for ILIKE search)");

        await sql`
            CREATE INDEX IF NOT EXISTS idx_jobs_location_trgm 
            ON jobs USING gin(location gin_trgm_ops);
        `;
        console.log("✅ Created index: idx_jobs_location_trgm (for ILIKE search)");

        // Composite index for common query pattern: is_active + created_at
        await sql`
            CREATE INDEX IF NOT EXISTS idx_jobs_active_created 
            ON jobs(is_active, created_at DESC) 
            WHERE is_active = true;
        `;
        console.log("✅ Created index: idx_jobs_active_created (composite)");

        // Companies table indexes
        await sql`
            CREATE INDEX IF NOT EXISTS idx_companies_recruiter_id 
            ON companies(recruiter_id);
        `;
        console.log("✅ Created index: idx_companies_recruiter_id");

        // Applications table indexes
        await sql`
            CREATE INDEX IF NOT EXISTS idx_applications_job_id 
            ON applications(job_id);
        `;
        console.log("✅ Created index: idx_applications_job_id");

        await sql`
            CREATE INDEX IF NOT EXISTS idx_applications_applicant_id 
            ON applications(applicant_id);
        `;
        console.log("✅ Created index: idx_applications_applicant_id");

        await sql`
            CREATE INDEX IF NOT EXISTS idx_applications_applied_at 
            ON applications(applied_at DESC);
        `;
        console.log("✅ Created index: idx_applications_applied_at");

        await sql`
            CREATE INDEX IF NOT EXISTS idx_applications_subscribed 
            ON applications(subscribed) 
            WHERE subscribed = true;
        `;
        console.log("✅ Created index: idx_applications_subscribed");

        // Composite index for application listing query
        await sql`
            CREATE INDEX IF NOT EXISTS idx_applications_job_subscribed_applied 
            ON applications(job_id, subscribed DESC, applied_at ASC);
        `;
        console.log("✅ Created index: idx_applications_job_subscribed_applied (composite)");

        console.log("🎉 Database indexing completed successfully!");
        return true;
    } catch (error) {
        console.error("❌ Error creating indexes:", error);
        throw error;
    }
}

/**
 * Run this function to add indexes
 * Can be called from index.ts after table creation
 */
export async function initIndexes() {
    try {
        await addDatabaseIndexes();
    } catch (error) {
        console.error("Failed to initialize indexes:", error);
        // Don't exit - indexes are performance optimizations, not critical
    }
}

