import express from 'express';
import config from 'config';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import routes from '../routes';

const clientUrl = config.get<string>('clientUrl').split(',');

export const createServer = () => {
  const app = express();
  app.use(helmet());
  app.use(
    cors({
      origin: clientUrl,
      credentials: true,
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    })
  );
  app.use(express.json({ limit: '5MB' }));
  app.use(cookieParser());
  routes(app);

  return app;
};
