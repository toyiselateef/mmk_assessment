import express, { IRouter, Request, Response } from "express";
import sms from "../controllers/sms.controller";
import inbound from "../validators/inbound";
import outbound from "../validators/outbound";
import validate from "../middlewares/validate";

const router: IRouter = express.Router();

router.get("/inbound/sms/", validate(inbound), sms.inbound);

router.get("/outbound/sms/", validate(outbound), sms.outbound);

export default router;
