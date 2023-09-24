import { Request, Response, NextFunction } from 'express';

import { SetNewPasswordInput } from '@/schemas';
import { CryptoService } from '@/services';

import { CredentialsError } from '@/models/apiError/apiError.entity';
import { ResetPasswordTokenDatabase } from '@/models/resetPasswordToken/resetPasswordToken.database';
import { UserDatabase } from '@/models/user/user.database';

export const setNewPasswordController = async (
  req: Request<
    SetNewPasswordInput['params'],
    {},
    SetNewPasswordInput['body'],
    SetNewPasswordInput['query']
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, token } = req.params;
    const { password } = req.body;
    const userDb = new UserDatabase();
    const resetPasswordTokenDb = new ResetPasswordTokenDatabase();
    const cryptoService = new CryptoService();

    let foundToken;
    try {
      foundToken = await resetPasswordTokenDb.findValidTokenByUserId({
        userId,
      });
    } catch (error) {
      throw new CredentialsError({
        path: 'setNewPassword',
        type: 'API',
        details: 'invalid_token',
      });
    }

    const tokenMatch = await cryptoService.compare(token, foundToken?.token);
    if (!tokenMatch) {
      throw new CredentialsError({
        path: 'setNewPasswordUsecase',
        type: 'API',
        details: 'invalid_token',
      });
    }

    resetPasswordTokenDb.invalidateAllUserTokens(userId);
    const passwordHash = await cryptoService.hash(password);
    await userDb.update(userId, { password: passwordHash });

    res.status(200).json({
      message: 'new_password_set_successfully',
    });
  } catch (error) {
    next(error);
  }
};
