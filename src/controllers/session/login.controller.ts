import config from 'config';

import { Request, Response, NextFunction } from 'express';

import { CryptoService } from '@/services/crypto.service';
import { TokenService } from '@/services/token.service';

import { CredentialsError } from '@/models/apiError/apiError.entity';

import { UserDatabase } from '@/models/user/user.database';
import { SessionDatabase } from '@/models/session/session.database';

import { LoginInput } from '@/schemas/session/login.schema';

export const loginController = async (
  req: Request<LoginInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const userAgent = req.headers['user-agent'] || null;

    const cryptoService = new CryptoService();
    const tokenService = new TokenService();

    const userDb = new UserDatabase();
    const sessionDb = new SessionDatabase();

    let user;

    try {
      user = await userDb.readByEmail({ email });
    } catch (error) {
      throw new CredentialsError({
        path: 'login',
        type: 'API',
        details: 'invalid_credentials',
      });
    }

    if (!user || !user.id) {
      throw new CredentialsError({
        path: 'login',
        type: 'API',
        details: 'invalid_credentials',
      });
    }

    const isPasswordValid = await cryptoService.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new CredentialsError({
        path: 'login',
        type: 'API',
        details: 'invalid_credentials',
      });
    }

    const session = await sessionDb.create({
      userId: user.id,
      active: true,
      userAgent: userAgent,
    });

    sessionDb.revokeAllExceptOne({
      id: session.id,
      userId: user.id,
    });

    const accessToken = tokenService.createAccessToken({
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
      session: {
        id: session.id,
      },
    });

    const refreshToken = tokenService.createRefreshToken({
      userId: user.id,
      sessionId: session.id,
    });

    const accessTokenTtl = config.get<string>('accessTokenTtl');
    const refreshTokenTtl = config.get<string>('refreshTokenTtl');

    res.cookie('accessToken', accessToken, {
      maxAge: parseInt(accessTokenTtl) * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: parseInt(refreshTokenTtl) * 24 * 60 * 60 * 1000, // 7 days.
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return res.status(201).json(session);
  } catch (error) {
    return next(error);
  }
};
