import { Request, Response, NextFunction } from 'express';

import { CartDatabase } from '@/models/cart/cart.database';

import { ReadCartInput } from '@/schemas/cart/readCart.schema';

import { handleError } from '@/utils/errors.util';

export const readCartController = async (
  req: Request<ReadCartInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const cartDb = new CartDatabase();

    const cart = await cartDb.readCart(userId);
    return res.status(200).json({ cart });
  } catch (error) {
    return next(error);
  }
};
