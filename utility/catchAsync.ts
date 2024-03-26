import { NextFunction, Request, Response } from 'express';

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const catchAsync =
  (fn: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };

export default catchAsync;
