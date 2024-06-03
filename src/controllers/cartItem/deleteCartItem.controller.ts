import { Request, Response, NextFunction } from 'express';

import { CartItemDatabase } from '@/models/cartItem/cartItem.database';

import { DeleteCartItemInput } from '@/schemas/cartItem/deleteCartItem.schema';

export const deleteCartItemController = async (
  req: Request<DeleteCartItemInput['params']>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const cartItemDb = new CartItemDatabase();

  try {
    await cartItemDb.delete({ id });
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
