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
/**
 * @swagger
 * components:
 *   schemas:
 *     Inbound:
 *       type: object
 *       required:
 *         - from
 *         - to
 *         - text
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the request maker
 *         password:
 *           type: string
 *           description: The auth_id of the request maker from db
 *         to:
 *           type: string
 *           description: The receiver sending the sms request
 *         from:
 *           type: string
 *           description: The number sending the sms request
 *         text:
 *           type: string
 *           description: The text content of the sms
 *       example:
 *         from: 43234567567
 *         to: 4345678970987
 *         text: I'm just running all night
 *         username: arx3
 *         password: 673474747wer
 *
 *
 *     Outbound:
 *       type: object
 *       required:
 *         - from
 *         - to
 *         - text
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the request maker
 *         password:
 *           type: string
 *           description: The auth_id of the request maker from db
 *         to:
 *           type: string
 *           description: The receiver sending the sms request
 *         from:
 *           type: string
 *           description: The number sending the sms request
 *         text:
 *           type: string
 *           description: The text content of the sms
 *       example:
 *         from: 43234567567
 *         to: 4345678970987
 *         text: I'm just running all night
 *         username: arx3
 *         password: 673474747wer
 *
 */
/**
 * @swagger
 * tags:
 *   name: sms
 *   description: sms request handles
 */
/**
 * @swagger
 * /sms/inbound:
 *   post:
 *     summary:  make an inbound sms request
 *     tags: [Inbound]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inbound'
 *     responses:
 *       200:
 *         description: The inbound sms requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inbound'
 *       500:
 *         description: Some server error
 */
router.post("/sms/inbound", (0, validate_1.default)(inbound_1.default), sms_controller_1.default.inbound);
/**
 * @swagger
 * /sms/outbound:
 *   post:
 *     summary: make an outbound sms request
 *     tags: [Outbound]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Outbound'
 *     responses:
 *       200:
 *         description: sms is ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Outbound'
 *       500:
 *         description: Some server error
 */
router.post("/sms/outbound", (0, validate_1.default)(outbound_1.default), sms_controller_1.default.outbound);
exports.default = router;
//# sourceMappingURL=sms.route.js.map