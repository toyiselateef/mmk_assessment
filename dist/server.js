"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
require("dotenv/config");
const auth_1 = __importDefault(require("./middlewares/auth"));
const sms_route_1 = __importDefault(require("./routes/sms.route"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.static("public"));
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: "../swagger.json",
    },
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const validEndpoints = ["/sms/inbound", "/sms/outbound"];
    if (!validEndpoints.includes(req.originalUrl))
        return res.status(405);
    return next();
});
app.use((0, morgan_1.default)(":method :url statusCode ===  :status :res[content-length] - :response-time ms"));
app.use("/", auth_1.default, sms_route_1.default);
app.listen(port, () => {
    console.log(`subscriber connected to ${port}`);
});
//# sourceMappingURL=server.js.map