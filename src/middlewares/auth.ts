import { Request, Response, NextFunction } from "express";
import db from "../config/db";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("authenticating...");
  const username = req.body.username;
  const password = req.body.password;

  try {
    const { rows } = await db.query(
      "Select * from account where auth_id = $2 and username = $1",
      [username, password]
    );

    if (rows.length > 0) {
      console.log("value credentials");

      req.body.userId = rows[0].id;

      console.log("authentication successful");
      return next();
    } else {
      console.log(`authentication unsuccessful for: ${username}`);
      console.log("invalid username or password");
      return res
        .status(403)
        .json({ message: "", error: "invalid username or password" });
    }
  } catch (error) {
    console.log(`authentication unsuccessful for: ${username}`);
    console.log(`this error occurred: ${error}`);
    return res.status(500).json({ message: "", error: "unknown failure" });
  }
};
export default authenticate;
