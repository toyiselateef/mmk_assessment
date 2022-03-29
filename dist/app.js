"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const sms_route_1 = __importDefault(require("./routes/sms.route"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const morgan_1 = __importDefault(require("morgan"));
require("dotenv/config");
const port = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.static("public"));
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: "../swagger.json",
        host: `http://localhost:${port}`,
    },
}));
app.use(function (req, res, next) {
    const validEndpoints = ["/sms/inbound", "/sms/outbound"];
    if (!validEndpoints.some((element) => element == req.originalUrl))
        return res.status(404).json({ message: "", error: "no such endpoint" });
    if (req.method.toUpperCase() != "POST")
        return res.status(405).json({ message: "", error: "method not allowed" });
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return next();
});
app.use("/", auth_1.default, sms_route_1.default);
app.use((0, morgan_1.default)(":method :url statusCode ===  :status :res[content-length] - :response-time ms"));
exports.default = { app };
//# sourceMappingURL=app.js.map