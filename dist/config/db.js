"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
pool.on("connect", () => {
    console.log("connected successfully!");
});
exports.default = {
    query: (text, params) => pool.query(text, params)
};
//# sourceMappingURL=db.js.map