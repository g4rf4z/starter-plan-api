import { Request, Response, NextFunction } from 'express';

import { CryptoService } from '@/services/crypto.service';

import { UserDatabase } from '@/models/user/user.database';
import { CartDatabase } from '@/models/cart/cart.database';

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

    const cryptoService = new CryptoService();

    const userDatabase = new UserDatabase();
    const cartDb = new CartDatabase();

    const hashedPassword = await cryptoService.hash(password);
    const user = await userDatabase.createUser({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    const cart = await cartDb.createCart({
      userId: user.id,
    });
    return res.status(201).json({ user, cart });
  } catch (error) {
    next(error);
  }
};
