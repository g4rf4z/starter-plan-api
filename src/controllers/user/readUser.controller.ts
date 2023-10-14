import { Request, Response, NextFunction } from 'express';

import { IUser } from '@/models/user/user.entity';

import { UserDatabase } from '@/models/user/user.database';

import type { ReadUserInput } from '@/schemas/user/readUser.schema';

export const readUserController = async (
  req: Request<ReadUserInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id as IUser['id'];

    const userDb = new UserDatabase();

    const user = await userDb.readById({ id: userId });
    return res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
};
