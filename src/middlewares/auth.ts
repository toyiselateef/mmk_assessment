import { Request, Response, NextFunction } from "express";
import db from "../config/db";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('auth')
  const username = req.body.username;
  const password = req.body.password;

  const { rows } = await db.query(
    "Select * from account where auth_id = $2 and username = $1",
    [username, password]
  );

  if (rows.length > 0) {
    console.log('value credentials')
    req.body.userId=rows[0].id
    return next();
  } else {
    console.log('invalid username or password')
    return res.status(403).json({ message:"",error: "invalid username or password" });
  }
};
export default authenticate;
