import { Request, Response, NextFunction } from 'express';

import { UserDatabase } from '@/models/user/user.database';
import { CartDatabase } from '@/models/cart/cart.database';

import { FetchUserInput } from '@/schemas/user/user.schema';

import { handleError } from '@/utils/errors.util';

export const fetchUserController = async (
  req: Request<FetchUserInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const userDb = new UserDatabase();
    const cartDb = new CartDatabase();

    // read user by id
    const user = await userDb.readById(id);
    // read cart by user's id
    const cart = await cartDb.readByUserId(id);
    return res.status(201).json({ user, cart });
  } catch (error) {
    return handleError(error, res);
  }
};
