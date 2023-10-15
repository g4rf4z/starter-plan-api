import { Request, Response, NextFunction } from 'express';

import { CartItemDatabase } from '@/models/cartItem/cartItem.database';

import { ReadCartItemInput } from '@/schemas/cartItem/readCartItem.schema';

export const readCartItemController = async (
  req: Request<ReadCartItemInput['params']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const cartItemDb = new CartItemDatabase();

    const cartItem = await cartItemDb.readById({ id });
    return res.status(200).json({ cartItem });
  } catch (error) {
    return next(error);
  }
};
