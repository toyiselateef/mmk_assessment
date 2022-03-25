import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import "dotenv/config";
import authenticate from "./middlewares/auth";
import smsModule from "./routes/sms.route";

const app: Application = express();

const port = process.env.PORT || 3001;

app.use(express.json({ limit: "50mb" }));

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const validEndpoints = ["/inbound/sms", "/outbound/sms"];
  if (!validEndpoints.includes(req.route)) return res.status(405);
  return next();
});

app.use(
  morgan(
    ":method :url statusCode ===  :status :res[content-length] - :response-time ms"
  )
);

app.use("/", authenticate, smsModule);

app.listen(port, () => {
  console.log(`subscriber connected to ${port}`);
});

//used in testing Env. for integration testing
