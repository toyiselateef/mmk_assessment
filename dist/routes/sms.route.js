"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sms_controller_1 = __importDefault(require("../controllers/sms.controller"));
const inbound_1 = __importDefault(require("../validators/inbound"));
const outbound_1 = __importDefault(require("../validators/outbound"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const router = express_1.default.Router();
router.post("/inbound/sms/", (0, validate_1.default)(inbound_1.default), sms_controller_1.default.inbound);
router.post("/outbound/sms/", (0, validate_1.default)(outbound_1.default), sms_controller_1.default.outbound);
exports.default = router;
//# sourceMappingURL=sms.route.js.map