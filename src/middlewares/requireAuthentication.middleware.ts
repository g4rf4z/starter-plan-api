import { Request, Response, NextFunction } from 'express';

export const requireAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(res.locals.user);
  console.log(res.locals.session);
  if (!res.locals?.user && !res.locals?.session) return res.sendStatus(403);
  return next();
};
