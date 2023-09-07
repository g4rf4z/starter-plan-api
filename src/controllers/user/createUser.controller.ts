import { Request, Response, NextFunction } from 'express';

import { CartDatabase } from '@/models/cart/cart.database';
import { UserDatabase } from '@/models/user/user.database';

import { CryptoService } from '@/services/crypto.service';

import { CreateUserInput } from '@/schemas/user/createUser.schema';

export const createUserController = async (
  req: Request<
    CreateUserInput['params'],
    {},
    CreateUserInput['body'],
    CreateUserInput['query']
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const userDatabase = new UserDatabase();
    const cryptoService = new CryptoService();

    const hashedPassword = await cryptoService.hash(password);
    const user = await userDatabase.createUser({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    const cartDb = new CartDatabase();

    const cart = await cartDb.createCart({
      userId: user.id,
    });
    return res.status(201).json({ user, cart });
  } catch (error) {
    next(error);
  }
};
