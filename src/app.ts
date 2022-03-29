import express, { Application, NextFunction, Request, Response } from "express";
import authenticate from "./middlewares/auth";
import smsModule from "./routes/sms.route";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import morgan from "morgan";
import "dotenv/config";

const port = process.env.PORT || 3001;

const app: Application = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "../swagger.json",
      host: `http://localhost:${port}`,
    },
  })
);

app.use(function (req: Request, res: Response, next: NextFunction) {
  const validEndpoints = ["/sms/inbound", "/sms/outbound"];
  if (!validEndpoints.some((element) => element == req.originalUrl))
    return res.status(404).json({ message: "", error: "no such endpoint" });
  if (req.method.toUpperCase() != "POST")
    return res.status(405).json({ message: "", error: "method not allowed" });
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  return next();
});

app.use("/", authenticate, smsModule);

app.use(
  morgan(
    ":method :url statusCode ===  :status :res[content-length] - :response-time ms"
  )
);

export default { app };
