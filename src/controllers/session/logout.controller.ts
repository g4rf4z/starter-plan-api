import { Request, Response, NextFunction } from 'express';

import { LogoutInput } from '@/schemas/session/logout.schema';

import { AuthorizationError } from '@/models/apiError/apiError.entity';
import { ISession } from '@/models/session/session.entity';

import { SessionDatabase } from '@/models/session/session.database';

export const logoutController = async (
  req: Request<
    LogoutInput['params'],
    {}, // Options.
    LogoutInput['body'],
    LogoutInput['query']
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionId = res.locals.session.id as ISession['id'];

    if (!sessionId) {
      throw new AuthorizationError({
        path: 'logout',
        type: 'API',
        details: 'user_not_logged_in',
      });
    }

    const sessionDb = new SessionDatabase();
    await sessionDb.update({ id: sessionId, active: false });

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
