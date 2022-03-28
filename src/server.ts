import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import "dotenv/config";
import authenticate from "./middlewares/auth";
import smsModule from "./routes/sms.route";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cors from "cors"

const app: Application = express();

const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.static("public"));

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "dev") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}
app.use(requireHTTPS);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "../swagger.json",
    },
  })
);


app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const validEndpoints = ["/sms/inbound", "/sms/outbound"];
  
  if (!validEndpoints.includes(req.originalUrl)) return res.status(405);
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

