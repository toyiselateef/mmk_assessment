"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = require("./CustomError");
function handleError(err, req, res, next) {
    console.log(`this error occurred: ${err.message}`);
    let customError = err;
    if (!(err instanceof CustomError_1.CustomError)) {
        customError = new CustomError_1.CustomError("unknown error occured");
    }
    res
        .status(customError.status)
        .json({ message: "", error: "unknown failure" });
}
exports.default = handleError;
//export default handleError;
//# sourceMappingURL=handleErrors.js.map