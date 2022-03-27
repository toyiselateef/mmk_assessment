"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const outbound = joi_1.default.object().keys({
    from: joi_1.default.string().min(6).max(16).required().messages({
        "string.base": `from is invalid`,
        "string.empty": `from is missing`,
        "string.min": `from is invalid`,
        "any.required": `from is invalid`,
    }),
    to: joi_1.default.string().min(6).max(16).required().messages({
        "string.base": `to is invalid`,
        "string.empty": `to is missing`,
        "string.min": `to is invalid`,
        "any.required": `to is invalid`,
    }),
    text: joi_1.default.string().min(1).max(120).required().messages({
        "string.base": `text is invalid`,
        "string.empty": `text is missing`,
        "string.min": `text is invalid`,
        "any.required": `text is invalid`,
    }),
    username: joi_1.default.string().optional(),
    password: joi_1.default.string().optional(),
    userId: joi_1.default.number().optional(),
});
exports.default = outbound;
//# sourceMappingURL=outbound.js.map