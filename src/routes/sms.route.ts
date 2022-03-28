import express, { IRouter, Request, Response } from "express";
import sms from "../controllers/sms.controller";
import inbound from "../validators/inbound";
import outbound from "../validators/outbound";
import validate from "../middlewares/validate";

const router: IRouter = express.Router();


 
 const methodNotAllowed = (req, res, next) => res.status(405).json({ message:"",error: "method not allowed" });
router.route("/sms/inbound").post( validate(inbound), sms.inbound).all(methodNotAllowed);


router.route("/sms/outbound").post( validate(outbound), sms.outbound).all(methodNotAllowed);

export default router;
