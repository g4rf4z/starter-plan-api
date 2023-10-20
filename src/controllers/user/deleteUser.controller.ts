import { Request, Response, NextFunction } from 'express';

import { IUser } from '@/models/user/user.entity';

import { UserDatabase } from '@/models/user/user.database';

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id as IUser['id'];

    const userDb = new UserDatabase();

    await userDb.delete({ id: userId });
    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};
