const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,       // MySQL server host
  user: process.env.DB_USER,       // MySQL username
  password: process.env.DB_PASSWORD, // MySQL password
  database: process.env.DB_NAME,   // Database name
  waitForConnections: true,        // Enable connection queue
  connectionLimit: 10,             // Maximum number of connections in the pool
  queueLimit: 0                    // Unlimited queue limit
});


const db = pool.promise();

module.exports = db;
