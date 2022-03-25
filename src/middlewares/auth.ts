import { Request, Response, NextFunction } from "express";
import db from "../config/db";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = req.body.username;
  const password = req.body.password;

  const { rows } = await db.query(
    "Select * where auth_id = $1 & password = $2",
    [username, password]
  );

  if (rows > 0) {
    return next();
  } else {
    return res.status(403).json({ message: "invalid username or password" });
  }
};
export default authenticate;
