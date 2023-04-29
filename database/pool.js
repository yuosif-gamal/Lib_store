const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const Config = {
    
    connectionString: process.env.DATABASE_URL, 
    connectionTimeoutMillis: 300,
    idleTimeoutMillis: 200,
    max: 20,

  }

  const pool = new Pool(Config);

  pool.on('connect', () => {
    console.log("Database connect")
  })
  pool.on('remove', () => {
    console.log("database connection removed");
  })
  module.exports = pool;