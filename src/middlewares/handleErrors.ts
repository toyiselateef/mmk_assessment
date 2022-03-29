import { Request, Response, NextFunction } from "express";
import { CustomError } from "./CustomError";

export default function handleError(
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(`this error occurred: ${err.message}`);
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError("unknown error occured");
  }

  res
    .status((customError as CustomError).status)
    .json({ message: "", error: "unknown failure" });
}

//export default handleError;
