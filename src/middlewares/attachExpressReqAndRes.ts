import { Response, Request, NextFunction } from "express";

export async function attachExpressReqAndRes(req: Request, res: Response, next: NextFunction) {
  req.res = res;
  (req as any).expressRawRequest = req;
  next();
  }