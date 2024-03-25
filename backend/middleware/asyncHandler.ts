import { Request, Response, NextFunction } from "express";

const asnycHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asnycHandler;
