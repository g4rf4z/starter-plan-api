import config from 'config';

import { NextFunction, Request, Response } from 'express';

import { CryptoService } from '@/services/crypto.service';
import { EmailService } from '@/services/email.service';

import { ResetPasswordInput } from '@/schemas/session/resetPasswordToken.schema';

import { CredentialsError } from '@/models/apiError/apiError.entity';

import { ResetPasswordTokenDatabase } from '@/models/resetPasswordToken/resetPasswordToken.database';
import { UserDatabase } from '@/models/user/user.database';

export const resetPasswordController = async (
  req: Request<
    ResetPasswordInput['params'],
    {}, // Options.
    ResetPasswordInput['body'],
    ResetPasswordInput['query']
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const clientUrl = config.get<string>('clientUrl');

    const userDb = new UserDatabase();
    const resetPasswordTokenDb = new ResetPasswordTokenDatabase();

    const cryptoService = new CryptoService();
    const emailService = new EmailService();

    let user;

    try {
      user = await userDb.readByEmail({ email });
    } catch (error) {
      throw new CredentialsError({
        path: 'resetPasswordUsecase',
        type: 'API',
        details: 'email_not_found',
      });
    }

    await resetPasswordTokenDb.invalidateAllUserTokens(user.id);
    const token = cryptoService.generateRandomString(32);
    const tokenHash = await cryptoService.hash(token);
    await resetPasswordTokenDb.create({
      expiresAt: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes.
      userId: user.id,
      token: tokenHash,
      isValid: true,
    });

    const setNewPasswordUrl = `${clientUrl}/set-password?id=${user.id}&token=${token}`;
    emailService.sendEmail({
      email: user.email,
      subject: 'Starter Plan - Réinitialisation du mot de passe',
      text: `Bonjour,
      Veuillez cliquer sur le lien ci-dessous afin de réinitialiser votre mot de passe : ${setNewPasswordUrl}`,
      html: `<h1>Bonjour</h1>
      <p>Veuillez cliquer sur le lien ci-dessous afin de réinitialiser votre mot de passe :</p>
      <p><a href="${setNewPasswordUrl}">Réinitialiser le mot de passe</a></p>`,
    });
    return res.status(200).json({
      message: 'reset_password_email_sent',
    });
  } catch (error) {
    next(error);
  }
};
