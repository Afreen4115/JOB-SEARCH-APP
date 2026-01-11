import { sql } from "./db.js";

/**
 * Database Indexing Migration for Auth Service
 * 
 * This script adds performance indexes to optimize query performance.
 * Run this after the initial database setup.
 */

export async function addDatabaseIndexes() {
    try {
        console.log("🔍 Starting auth service database indexing...");

        // User_skills table indexes
        // Note: PRIMARY KEY already creates index on (user_id, skill_id)
        // But individual indexes help with reverse lookups
        
        await sql`
            CREATE INDEX IF NOT EXISTS idx_user_skills_user_id 
            ON user_skills(user_id);
        `;
        console.log("✅ Created index: idx_user_skills_user_id");

        await sql`
            CREATE INDEX IF NOT EXISTS idx_user_skills_skill_id 
            ON user_skills(skill_id);
        `;
        console.log("✅ Created index: idx_user_skills_skill_id");

        // Users table - additional indexes
        await sql`
            CREATE INDEX IF NOT EXISTS idx_users_role 
            ON users(role);
        `;
        console.log("✅ Created index: idx_users_role");

        // Note: email already has UNIQUE index
        // Note: user_id already has PRIMARY KEY index

        console.log("🎉 Auth service database indexing completed!");
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

