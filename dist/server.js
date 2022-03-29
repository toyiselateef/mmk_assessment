"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv/config");
const morgan_1 = __importDefault(require("morgan"));
const handleErrors_1 = __importDefault(require("../src/middlewares/handleErrors"));
const port = process.env.PORT || 3001;
function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure &&
        req.get("x-forwarded-proto") !== "https" &&
        process.env.NODE_ENV !== "dev") {
        return res.redirect("https://" + req.get("host") + req.url);
    }
    next();
}
app_1.default.app.use(requireHTTPS);
app_1.default.app.use((0, morgan_1.default)(":method :url statusCode ===  :status :res[content-length] - :response-time ms"));
app_1.default.app.use(handleErrors_1.default);
app_1.default.app.listen(port, () => console.log(`app started on ${port}`));
//# sourceMappingURL=server.js.map