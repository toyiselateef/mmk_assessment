import app from "./app";
import "dotenv/config";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import handleError from "../src/middlewares/handleErrors";

const port = process.env.PORT || 3001;

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (
    !req.secure &&
    req.get("x-forwarded-proto") !== "https" &&
    process.env.NODE_ENV !== "dev"
  ) {
    return res.redirect("https://" + req.get("host") + req.url);
  }
  next();
}
app.app.use(requireHTTPS);

app.app.use(
  morgan(
    ":method :url statusCode ===  :status :res[content-length] - :response-time ms"
  )
);
app.app.use(handleError);
app.app.listen(port, () => console.log(`app started on ${port}`));
