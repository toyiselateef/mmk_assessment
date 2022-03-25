import { Request, Response, NextFunction } from "express";

export default (schemaBody) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let validation: any;
    let error = { details: undefined };
    try {
      validation = await schemaBody.validateAsync(req.body);
    } catch (err) {
      error.details = err;
      console.log(
        ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
        err
      );
    }

    let valid = error.details == undefined;

    if (valid) {
      return next();
    } else {
      const { details } = error;
      return res.status(422).json({ message: "", error: details });
    }
  };
};
