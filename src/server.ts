import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import "dotenv/config";
import authenticate from "./middlewares/auth";
import smsModule from "./routes/sms.route";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";


const app: Application = express();

const port = process.env.PORT || 3001;

app.use(express.json({ limit: "50mb" }));
app.use(express.static("public"));

// const options = {
// 	definition: {
// 		openapi: "3.0.0",
// 		info: {
// 			title: "MMK API",
// 			version: "1.0.0",
// 			description: "A simple SMS API for MMK",
// 		},
// 		servers: [
// 			{
// 				url: `http://localhost:${port}`,
// 			},
// 		],
// 	},
// 	apis: ["./routes/*.ts"],
// };

//const specifications = swaggerJsDoc(options);
//app.use( "/docs",swaggerUi.serve, swaggerUi.setup(specifications));

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
  const validEndpoints = ["/inbound/sms", "/outbound/sms"];
  if (!validEndpoints.includes(req.originalUrl)) return res.status(405);
  return next();
});


app.use(
  morgan(
    ":method :url statusCode ===  :status :res[content-length] - :response-time ms"
  )
);

// app.use(
//   "/docs",
//   swaggerUi.serve,
//   swaggerUi.setup(undefined, {
//     swaggerOptions: {
//       url: "../swagger.json",
//     },
//   })
// );
app.use("/", authenticate, smsModule);

app.listen(port, () => {
  console.log(`subscriber connected to ${port}`);
});

//used in testing Env. for integration testing
