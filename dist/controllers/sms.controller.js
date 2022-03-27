"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const redis_1 = __importDefault(require("../middlewares/redis"));
async function inbound(req, res) {
    console.log('inbound here');
    try {
        const { to, from, text, userId } = req.body;
        const { rows } = await db_1.default.query("Select * from  phone_number where number = $1 and account_id = $2", [to, userId]);
        if (rows.length > 0) {
            if (text.startsWith("STOP")) {
                redis_1.default.cache(from, to, 60 * 60 * 4);
            }
            return res.status(200).json({ message: "inbound sms ok", error: "" });
        }
        else {
            return res
                .status(404)
                .json({ message: "", error: "to parameter not found" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "", error: "unknown failure" });
    }
}
async function outbound(req, res) {
    console.log('outbound here');
    try {
        const { to, from, text, userId } = req.body;
        const { rows } = await db_1.default.query("Select * from  phone_number where number = $1 and account_id = $2", [from, userId]);
        if (rows.length > 0) {
            const prevValOfFrom = redis_1.default.get(from);
            if (prevValOfFrom == to)
                return res.status(403).json({
                    message: "",
                    error: `sms from ${from} to ${to} blocked by STOP request`,
                });
            if (parseInt(await redis_1.default.get(`${from}_time`)) > 50) {
                return res
                    .status(403)
                    .json({ message: "", error: `limit reached for from ${from}` });
            }
            return res.status(200).json({ message: "inbound sms ok", error: "" });
        }
        else {
            return res
                .status(404)
                .json({ message: "", error: "to parameter not found" });
        }
    }
    catch (error) {
        console.log('errors');
        return res.status(500).json({ message: "", error: "unknown failure" });
    }
}
exports.default = { inbound, outbound };
//# sourceMappingURL=sms.controller.js.map