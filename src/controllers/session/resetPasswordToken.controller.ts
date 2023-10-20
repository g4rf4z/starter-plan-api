import config from 'config';

import { Request, Response, NextFunction } from 'express';

import { CryptoService } from '@/services/crypto.service';
import { EmailService } from '@/services/email.service';

import { CredentialsError } from '@/models/apiError/apiError.entity';

import { UserDatabase } from '@/models/user/user.database';
import { ResetPasswordTokenDatabase } from '@/models/resetPasswordToken/resetPasswordToken.database';

import { ResetPasswordInput } from '@/schemas/session/resetPasswordToken.schema';

export const resetPasswordController = async (
  req: Request<ResetPasswordInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const clientUrl = config.get<string>('clientUrl');

    const cryptoService = new CryptoService();
    const emailService = new EmailService();

    const userDb = new UserDatabase();
    const resetPasswordTokenDb = new ResetPasswordTokenDatabase();

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
      subject: 'Starter Plan - Réinitialisation de mot de passe',
      text: `Bonjour ${user.firstname},
      Vous avez demandé la réinitialisation de votre mot de passe. Pour le réinitialiser, veuillez cliquer sur le lien ci-dessous 👇🏻
      ${setNewPasswordUrl}`,
      html: `<p>Bonjour ${user.firstname},</p>
      <p>Vous avez demandé la réinitialisation de votre mot de passe. Pour le réinitialiser, veuillez cliquer sur le lien ci-dessous 👇🏻</p>
      <p><a href="${setNewPasswordUrl}">Réinitialiser le mot de passe</a></p>`,
    });
    return res.status(200).json({
      message: 'reset_password_email_sent',
    });
  } catch (error) {
    return next(error);
  }
};
