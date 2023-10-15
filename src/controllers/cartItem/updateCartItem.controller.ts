import { Request, Response, NextFunction } from 'express';

import { CartItemDatabase } from '@/models/cartItem/cartItem.database';

import type { UpdateCartItemInput } from '@/schemas/cartItem/updateCartItem.schema';

export const updateCartItemController = async (
  req: Request<UpdateCartItemInput['params'], UpdateCartItemInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const cartItemDb = new CartItemDatabase();

    const cartItem = await cartItemDb.update({
      id,
      quantity,
    });
    return res.status(201).json({ cartItem });
  } catch (error) {
    return next(error);
  }
};
