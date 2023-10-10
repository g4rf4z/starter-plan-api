import { Request, Response, NextFunction } from 'express';

import { RetrieveSessionInput } from '@/schemas/session/retrieveSession.schema';

import { AuthorizationError } from '@/models/apiError/apiError.entity';
import { ISession } from '@/models/session/session.entity';

import { SessionDatabase } from '@/models/session/session.database';

export const retrieveSessionController = async (
  req: Request<
    RetrieveSessionInput['params'],
    {}, // Options.
    RetrieveSessionInput['body'],
    RetrieveSessionInput['query']
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionId = res.locals.session.id as ISession['id'];

    const sessionDb = new SessionDatabase();

    let session;

    try {
      session = await sessionDb.readById({ id: sessionId });
      if (!session.active) throw new Error();
    } catch (error) {
      throw new AuthorizationError({
        path: 'retrieveSession',
        type: 'API',
        details: 'unauthorized',
      });
    }
    return res.status(200).json({ session });
  } catch (error) {
    return next(error);
  }
};
