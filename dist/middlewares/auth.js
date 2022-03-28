"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const authenticate = async (req, res, next) => {
    console.log('auth');
    const username = req.body.username;
    const password = req.body.password;
    const { rows } = await db_1.default.query("Select * from account where auth_id = $2 and username = $1", [username, password]);
    if (rows.length > 0) {
        console.log('value credentials');
        req.body.userId = rows[0].id;
        return next();
    }
    else {
        console.log('invalid username or password');
        return res.status(403).json({ message: "", error: "invalid username or password" });
    }
};
exports.default = authenticate;
//# sourceMappingURL=auth.js.map