"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const authenticate = async (req, res, next) => {
    console.log("authenticating...");
    const username = req.body.username;
    const password = req.body.password;
    try {
        const { rows } = await db_1.default.query("Select * from account where auth_id = $2 and username = $1", [username, password]);
        if (rows.length > 0) {
            console.log("value credentials");
            req.body.userId = rows[0].id;
            console.log("authentication successful");
            return next();
        }
        else {
            console.log(`authentication unsuccessful for: ${username}`);
            console.log("invalid username or password");
            return res
                .status(403)
                .json({ message: "", error: "invalid username or password" });
        }
    }
    catch (error) {
        console.log(`authentication unsuccessful for: ${username}`);
        console.log(`this error occurred: ${error}`);
        return res.status(500).json({ message: "", error: "unknown failure" });
    }
};
exports.default = authenticate;
//# sourceMappingURL=auth.js.map