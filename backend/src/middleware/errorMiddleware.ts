import { NextFunction, Response, Request } from "express";

interface IError extends Error {
  statusCode: number;
}

const errorHandler = (err: IError, req: Request, res: Response, next: NextFunction) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  err.message = err.message || "Internal server error";

  return res.status(statusCode).json({
    statusCode: err.statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { errorHandler };
