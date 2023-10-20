import { Request, Response, NextFunction } from 'express';

import { IUser } from '@/models/user/user.entity';

import { CartDatabase } from '@/models/cart/cart.database';
import { CartItemDatabase } from '@/models/cartItem/cartItem.database';

export const readAllCartItemsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id as IUser['id'];

    const cartDb = new CartDatabase();
    const cartItemDb = new CartItemDatabase();

    const cart = await cartDb.readByUserId({ userId });
    const cartId = cart.id;

    const cartItems = await cartItemDb.readAll({ cartId });
    return res.status(200).json({ cartItems });
  } catch (error) {
    return next(error);
  }
};
