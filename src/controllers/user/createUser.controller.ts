import { Request, Response, NextFunction } from 'express';

import { UserDatabase } from '@/models/user/user.database';
import { CartDatabase } from '@/models/cart/cart.database';

import { CreateUserInput } from '@/schemas/user/createUser.schema';

import { handleError } from '@/utils/errors.util';

export const createUserController = async (
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    // create user
    const { firstname, lastname, email, password } = req.body;

    const userDb = new UserDatabase();

    const user = await userDb.createUser({
      firstname,
      lastname,
      email,
      password,
    });

    // create user's cart
    const cartDb = new CartDatabase();

    const cart = await cartDb.createCart({
      userId: user.id,
    });
    return res.status(201).json({ user, cart });
  } catch (error) {
    return handleError(error, res);
  }
};
