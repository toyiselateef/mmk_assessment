import { Pool } from "pg";
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("connected successfully!");
});

export default {
  query: (text, params) => pool.query(text, params)
};
