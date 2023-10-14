import { Request, Response, NextFunction } from 'express';

import { IUser } from '@/models/user/user.entity';

import { UserDatabase } from '@/models/user/user.database';

import { UpdateUserInput } from '@/schemas/user/updateUser.schema';

export const updateUserController = async (
  req: Request<{}, {}, UpdateUserInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id as IUser['id'];
    const { firstname, lastname, email } = req.body;

    const userDb = new UserDatabase();

    const user = await userDb.update(userId, { firstname, lastname, email });
    return res.send(200).json({ user });
  } catch (error) {
    return next(error);
  }
};
