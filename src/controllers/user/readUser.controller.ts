import { Request, Response, NextFunction } from 'express';

import { IUser } from '@/models/user/user.entity';

import { UserDatabase } from '@/models/user/user.database';
import { CartDatabase } from '@/models/cart/cart.database';

import type { ReadUserInput } from '@/schemas/user/readUser.schema';

import { handleError } from '@/utils/errors.util';

export const readUserController = async (
  req: Request<ReadUserInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id as IUser['id'];

    const userDb = new UserDatabase();
    const cartDb = new CartDatabase();

    const user = await userDb.readUser(userId);
    const cart = await cartDb.readCart(userId);
    return res.status(200).json({ user, cart });
  } catch (error) {
    return next(error);
  }
};
