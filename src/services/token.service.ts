import config from 'config';
import jwt from 'jsonwebtoken';

import { AuthorizationError } from '@/models/apiError/apiError.entity';

import { SessionDatabase } from '@/models/session/session.database';
import { UserDatabase } from '@/models/user/user.database';

export interface AccessToken {
  user: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
  session: {
    id: string;
  };
}

export interface RefreshToken {
  userId: string;
  sessionId: string;
}

export class TokenService {
  private readonly privateKey: string;
  private readonly publicKey: string;
  private readonly userDb?: UserDatabase;
  private readonly sessionDb?: SessionDatabase;

  constructor(reIssue = false) {
    this.privateKey = config.get<string>('privateKey');
    this.publicKey = config.get<string>('publicKey');
    if (reIssue) {
      this.userDb = new UserDatabase();
      this.sessionDb = new SessionDatabase();
    }
  }

  private signJwt(payload: any, options: jwt.SignOptions) {
    return jwt.sign(payload, this.privateKey, {
      ...options,
      algorithm: 'RS256',
    });
  }

  createAccessToken(payload: AccessToken) {
    return this.signJwt(payload, {
      expiresIn: config.get<string>('accessTokenTtl'),
    });
  }

  createRefreshToken(payload: RefreshToken) {
    return this.signJwt(payload, {
      expiresIn: config.get<string>('refreshTokenTtl'),
    });
  }

  verify<T>(token: string) {
    try {
      return jwt.verify(token, this.publicKey) as T;
    } catch (error) {
      throw new AuthorizationError({
        path: 'verifyToken',
        type: 'API',
        details: 'invalid_token',
        raw: String(error),
      });
    }
  }

  async reIssueAccessToken(refreshToken: string) {
    const { userId, sessionId } = this.verify<RefreshToken>(refreshToken);

    let session, user;
    await Promise.all([
      (session = await this.sessionDb?.readById({ id: sessionId })),
      (user = await this.userDb?.readById({ id: userId })),
    ]);

    if (!session?.active || !user)
      throw new AuthorizationError({
        path: 'reIssueAccessToken',
        type: 'API',
        details: 'invalid_token',
      });

    return this.createAccessToken({
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
  }
}
