// Database setup script
const { Pool } = require("pg")

async function setupDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  })

  try {
    console.log("Setting up Blantyre Health Hub database...")

    // Create users table
    await pool.query(`
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
    `)

    // Create indexes
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_city ON users(city);
      CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
      CREATE INDEX IF NOT EXISTS idx_users_active ON users(is_active);
    `)

    // Create admin logs table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        action VARCHAR(100) NOT NULL,
        user_id UUID REFERENCES users(id),
        details JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `)

    console.log("✅ Database setup completed successfully!")
    console.log("📊 Tables created:")
    console.log("   - users (with indexes)")
    console.log("   - admin_logs")

    // Get current user count
    const result = await pool.query("SELECT COUNT(*) as count FROM users WHERE is_active = true")
    console.log(`👥 Current active users: ${result.rows[0].count}`)
  } catch (error) {
    console.error("❌ Database setup failed:", error)
  } finally {
    await pool.end()
  }
}

setupDatabase()
