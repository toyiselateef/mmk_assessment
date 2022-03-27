import db from "../config/db";
import { Request, Response } from "express";
import redisClient from "../middlewares/redis";
import redis from "../middlewares/redis";

async function inbound(req: Request, res: Response) {
  console.log('inbound here');
  try {
    const { to, from, text, userId } = req.body;
    const { rows } = await db.query(
      "Select * from  phone_number where number = $1 and account_id = $2",
      [to, userId]
    );

    if (rows.length > 0) {
      if (text.startsWith("STOP")) {
        redisClient.cache(from, to, 60 * 60 * 4);
      }
      return res.status(200).json({ message: "inbound sms ok", error: "" });
    } else {
      return res
        .status(404)
        .json({ message: "", error: "to parameter not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "", error: "unknown failure" });
  }
}

async function outbound(req: Request, res: Response) {
  console.log('outbound here');
  try {
    const { to, from, text, userId } = req.body;

    const { rows } = await db.query(
      "Select * from  phone_number where number = $1 and account_id = $2",
      [from, userId]
    );

    if (rows.length > 0) {
      const prevValOfFrom = redisClient.get(from);
      if (prevValOfFrom == to)
        return res.status(403).json({
          message: "",
          error: `sms from ${from} to ${to} blocked by STOP request`,
        });

      if (parseInt(await redisClient.get(`${from}_time`)) > 50) {
        return res
          .status(403)
          .json({ message: "", error: `limit reached for from ${from}` });
      }

      return res.status(200).json({ message: "inbound sms ok", error: "" });
    } else {
      return res
        .status(404)
        .json({ message: "", error: "to parameter not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "", error: "unknown failure" });
  }
}

export default { inbound, outbound };
