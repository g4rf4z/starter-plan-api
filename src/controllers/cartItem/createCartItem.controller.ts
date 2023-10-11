import { Request, Response, NextFunction } from 'express';

import { IUser } from '@/models/user/user.entity';

import { CartDatabase } from '@/models/cart/cart.database';
import { CartItemDatabase } from '@/models/cartItem/cartItem.database';

import type { CreateCartItemInput } from '@/schemas/cartItem/createCartItem.schema';

export const createCartItemController = async (
  req: Request<CreateCartItemInput['params'], {}, CreateCartItemInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id as IUser['id'];
    const productId = req.params.productId;
    const { quantity } = req.body;

    const cartDb = new CartDatabase();
    const cartItemDb = new CartItemDatabase();

    const cart = await cartDb.readCart(userId);
    const cartId = cart.id;

    const cartItem = await cartItemDb.create({
      cartId,
      productId,
      quantity,
    });
    return res.status(201).json({ cartItem });
  } catch (error) {
    return next(error);
  }
};
