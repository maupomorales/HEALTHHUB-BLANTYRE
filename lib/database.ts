// Database configuration and connection
import { Pool } from "pg"

// Database connection pool
let pool: Pool | null = null

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    })
  }
  return pool
}

// Database schema types
export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  date_of_birth?: string
  address?: string
  city: string
  interests: string[]
  created_at: string
  updated_at: string
  is_active: boolean
}

// Database operations
export class UserDatabase {
  private pool: Pool

  constructor() {
    this.pool = getPool()
  }

  // Create users table if it doesn't exist
  async initializeDatabase() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        date_of_birth DATE,
        address TEXT,
        city VARCHAR(100) NOT NULL,
        interests JSONB DEFAULT '[]',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        is_active BOOLEAN DEFAULT true
      );

      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_city ON users(city);
      CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
    `

    try {
      await this.pool.query(createTableQuery)
      console.log("Database initialized successfully")
    } catch (error) {
      console.error("Error initializing database:", error)
      throw error
    }
  }

  // Create a new user
  async createUser(userData: Omit<User, "id" | "created_at" | "updated_at" | "is_active">): Promise<User> {
    const query = `
      INSERT INTO users (first_name, last_name, email, phone, date_of_birth, address, city, interests)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `

    const values = [
      userData.first_name,
      userData.last_name,
      userData.email,
      userData.phone,
      userData.date_of_birth || null,
      userData.address || null,
      userData.city,
      JSON.stringify(userData.interests),
    ]

    try {
      const result = await this.pool.query(query, values)
      return result.rows[0]
    } catch (error) {
      console.error("Error creating user:", error)
      throw error
    }
  }

  // Check if email exists
  async emailExists(email: string): Promise<boolean> {
    const query = "SELECT id FROM users WHERE email = $1"
    try {
      const result = await this.pool.query(query, [email])
      return result.rows.length > 0
    } catch (error) {
      console.error("Error checking email:", error)
      throw error
    }
  }

  // Check if phone exists
  async phoneExists(phone: string): Promise<boolean> {
    const query = "SELECT id FROM users WHERE phone = $1"
    try {
      const result = await this.pool.query(query, [phone])
      return result.rows.length > 0
    } catch (error) {
      console.error("Error checking phone:", error)
      throw error
    }
  }

  // Get user by email
  async getUserByEmail(email: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE email = $1"
    try {
      const result = await this.pool.query(query, [email])
      return result.rows[0] || null
    } catch (error) {
      console.error("Error getting user by email:", error)
      throw error
    }
  }

  // Get all users (for admin purposes)
  async getAllUsers(limit = 100, offset = 0): Promise<User[]> {
    const query = `
      SELECT * FROM users 
      ORDER BY created_at DESC 
      LIMIT $1 OFFSET $2
    `
    try {
      const result = await this.pool.query(query, [limit, offset])
      return result.rows
    } catch (error) {
      console.error("Error getting all users:", error)
      throw error
    }
  }

  // Get user count
  async getUserCount(): Promise<number> {
    const query = "SELECT COUNT(*) as count FROM users WHERE is_active = true"
    try {
      const result = await this.pool.query(query)
      return Number.parseInt(result.rows[0].count)
    } catch (error) {
      console.error("Error getting user count:", error)
      throw error
    }
  }

  // Update user
  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ")

    const query = `
      UPDATE users 
      SET ${setClause}, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `

    const values = [id, ...Object.values(updates)]

    try {
      const result = await this.pool.query(query, values)
      return result.rows[0]
    } catch (error) {
      console.error("Error updating user:", error)
      throw error
    }
  }

  // Deactivate user (soft delete)
  async deactivateUser(id: string): Promise<boolean> {
    const query = "UPDATE users SET is_active = false, updated_at = NOW() WHERE id = $1"
    try {
      const result = await this.pool.query(query, [id])
      return result.rowCount > 0
    } catch (error) {
      console.error("Error deactivating user:", error)
      throw error
    }
  }
}
