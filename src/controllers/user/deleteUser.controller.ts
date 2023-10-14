import { Request, Response, NextFunction } from 'express';

import { IUser } from '@/models/user/user.entity';

import { UserDatabase } from '@/models/user/user.database';

import { DeleteUserInput } from '@/schemas/user/deleteUser.schema';

export const deleteUserController = async (
  req: Request<DeleteUserInput['params'], {}, {}>,
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
