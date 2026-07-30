import { Request, Response, NextFunction } from "express";

function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  res.status(status).json({ error: { message } });
}

export default errorHandler;