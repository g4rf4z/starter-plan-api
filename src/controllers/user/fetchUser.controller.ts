import { NextFunction, Request, Response } from 'express';

import { UserDatabase } from '@/models/user/user.database';
import { CartDatabase } from '@/models/cart/cart.database';

import type { ReadUserInput } from '@/schemas/user/readUser.schema';

import { handleError } from '@/utils/errors.util';

export const fetchUserController = async (
  req: Request<ReadUserInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const userDb = new UserDatabase();
    const cartDb = new CartDatabase();

    // read user by id
    const user = await userDb.readUser(id);
    // read cart by user's id
    const cart = await cartDb.readCart(id);
    return res.status(200).json({ user, cart });
  } catch (error) {
    return handleError(error, res);
  }
};
