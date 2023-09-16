import config from 'config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { tokenDeserializer } from '@/middlewares/tokenDeserializer.middleware';

import routes from '@/routes';

const clientUrl = config.get<string>('clientUrl');

export const createServer = () => {
  const app = express();

  // Security.
  app.use(helmet());

  // CORS policy.
  app.use(
    cors({
      origin: clientUrl,
      credentials: true,
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    })
  );

  // Body parser.
  app.use(express.json({ limit: '5MB' }));

  // Cookie(s).
  app.use(cookieParser());

  // Token(s).
  app.use(tokenDeserializer);

  // Route(s).
  routes(app);
  return app;
};
