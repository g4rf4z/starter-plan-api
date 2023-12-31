import { Request, Response, NextFunction } from 'express';

import { CryptoService } from '@/services/crypto.service';

import { UserDatabase } from '@/models/user/user.database';
import { CartDatabase } from '@/models/cart/cart.database';

import { CreateUserInput } from '@/schemas/user/createUser.schema';

export const createUserController = async (
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const cryptoService = new CryptoService();

    const userDb = new UserDatabase();
    const cartDb = new CartDatabase();

    const hashedPassword = await cryptoService.hash(password);
    const user = await userDb.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    const cart = await cartDb.create({ userId: user.id });
    return res.status(201).json({ user, cart });
  } catch (error) {
    return next(error);
  }
};
