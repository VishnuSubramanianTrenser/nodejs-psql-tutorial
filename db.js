// Importing library
const dotenv = require('dotenv');

// Importing PG library for postgresql connection
const { Pool } = require('pg');

// Create a postgresql connection pool
const pool = new Pool({
  user: process.env.PGUSER,          // e.g. postgres
  host: process.env.PGHOST,          // or your DB server IP
  database: process.env.PGDATABASE,  // DB name
  password: process.env.PGPASSWORD,  // DB password
  port: process.env.PGPORT,          // default PostgreSQL port
});

// Test the connection
pool.connect()
  .then(() => console.log("✅ Database connected via PostgreSQL-PG Library"))
  .catch(err => console.error("❌ Connection error", err.stack));

module.exports = pool;
