import { Request, Response, NextFunction } from 'express';

import { CryptoService } from '@/services/crypto.service';

import { IUser } from '@/models/user/user.entity';
import {
  NotFoundError,
  AuthorizationError,
} from '@/models/apiError/apiError.entity';

import { UserDatabase } from '@/models/user/user.database';

import { UpdateUserPasswordInput } from '@/schemas/user/updateUserPassword.schema';

export const updateUserPasswordController = async (
  req: Request<{}, {}, UpdateUserPasswordInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id as IUser['id'];
    const { password, newPassword } = req.body;

    const cryptoService = new CryptoService();
    const userDb = new UserDatabase();

    let user;

    try {
      user = await userDb.readById({ id: userId });
    } catch (error) {
      throw new NotFoundError({
        path: 'updatePassword',
        type: 'API',
        details: 'user_not_found',
      });
    }

    const isPasswordValid = await cryptoService.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new AuthorizationError({
        path: 'updatePassword',
        type: 'API',
        details: 'invalid_password',
      });
    }
    const hashedPassword = await cryptoService.hash(newPassword);
    await userDb.update(userId, { password: hashedPassword });
    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};
