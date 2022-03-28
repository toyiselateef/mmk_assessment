import express, { IRouter, Request, Response } from "express";
import sms from "../controllers/sms.controller";
import inbound from "../validators/inbound";
import outbound from "../validators/outbound";
import validate from "../middlewares/validate";

const router: IRouter = express.Router();
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

router.post("/sms/inbound", validate(inbound), sms.inbound);
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

router.post("/sms/outbound", validate(outbound), sms.outbound);

export default router;
