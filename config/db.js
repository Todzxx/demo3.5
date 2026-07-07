const { drizzle } = require("drizzle-orm/mysql2");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "sekolah",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
});

const db = drizzle(pool);

module.exports = { db, pool };
