import config from 'config';

import { Request, Response, NextFunction } from 'express';

import { CryptoService } from '@/services/crypto.service';
import { TokenService } from '@/services/token.service';

import { LoginInput } from '@/schemas/session/login.schema';

import { CredentialsError } from '@/models/apiError/apiError.entity';
import { SessionDatabase } from '@/models/session/session.database';
import { UserDatabase } from '@/models/user/user.database';

export const loginController = async (
  req: Request<
    LoginInput['params'],
    {}, // Options.
    LoginInput['body'],
    LoginInput['query']
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const userAgent = req.headers['user-agent'] || null;

    const sessionDb = new SessionDatabase();
    const userDb = new UserDatabase();
    const cryptoService = new CryptoService();
    const tokenService = new TokenService();

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
      // Vérification de nullité ajoutée ici
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

    console.log(password);
    console.log(user.password);
    console.log(isPasswordValid);

    if (!isPasswordValid) {
      throw new CredentialsError({
        path: 'login',
        type: 'API',
        details: 'invalid_credentials',
      });
    }
    console.log('3');
    const session = await sessionDb.create({
      active: true,
      userId: user.id,
      userAgent: userAgent,
    });

    sessionDb.revokeAllExceptOne({
      id: session.id,
      userId: user.id,
    });

    const accessToken = tokenService.createAccessToken({
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
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
      maxAge: parseInt(refreshTokenTtl) * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
};
