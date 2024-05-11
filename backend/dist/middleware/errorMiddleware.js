"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const handleDuplicateKeyError = (err, res) => {
    const field = Object.keys(err.keyValue);
    const code = 409;
    const error = `Restauracja o tej nazwie już istnieje!`;
    res.status(code).send({ message: error, fields: field });
};
const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map((el) => el.message);
    let fields = Object.values(err.errors).map((el) => el.path);
    let code = 400;
    if (errors.length > 1) {
        const formattedErrors = errors.join("");
        res.status(code).send({ message: formattedErrors, fields: fields });
    }
    else {
        res.status(code).send({ message: errors, fields: fields });
    }
};
const errorHandler = (err, req, res, next) => {
    if (err.name === "ValidationError")
        return (err = handleValidationError(err, res));
    if (err.code && err.code === 11000)
        return (err = handleDuplicateKeyError(err, res));
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
exports.errorHandler = errorHandler;
