const { defineConfig } = require("drizzle-kit");
const dotenv = require("dotenv");

dotenv.config();

module.exports = defineConfig({
  schema: "./schema/*.js",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});
