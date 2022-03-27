"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (schemaBody) => {
    return async (req, res, next) => {
        let validation;
        let error = { details: undefined };
        try {
            validation = await schemaBody.validateAsync(req.body);
        }
        catch (err) {
            error.details = err;
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", err);
        }
        let valid = error.details == undefined;
        if (valid) {
            return next();
        }
        else {
            const { details } = error;
            return res.status(422).json({ message: "", error: details });
        }
    };
};
//# sourceMappingURL=validate.js.map