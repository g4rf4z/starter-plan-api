import { Request, Response, NextFunction } from 'express';

import { IUser } from '@/models/user/user.entity';

import { CartDatabase } from '@/models/cart/cart.database';

export const readCartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id as IUser['id'];

    const cartDb = new CartDatabase();

    const cart = await cartDb.readByUserId({ userId });
    return res.status(200).json(cart);
  } catch (error) {
    return next(error);
  }
};
