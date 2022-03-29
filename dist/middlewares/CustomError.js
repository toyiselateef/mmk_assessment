"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError {
    constructor(message, status = 500, error = {}) {
        this.message = message;
        this.status = status;
        this.error = error;
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=CustomError.js.map