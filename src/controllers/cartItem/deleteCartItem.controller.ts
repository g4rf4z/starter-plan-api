import { Request, Response, NextFunction } from 'express';

import { CartItemDatabase } from '@/models/cartItem/cartItem.database';

import { DeleteCartItemInput } from '@/schemas/cartItem/deleteCartItem.schema';

export const deleteCartItemController = async (
  req: Request<
    DeleteCartItemInput['params'],
    {},
    DeleteCartItemInput['body'],
    DeleteCartItemInput['query']
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const cartItemDb = new CartItemDatabase();

    await cartItemDb.delete({ id });
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
