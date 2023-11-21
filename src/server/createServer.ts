import config from 'config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { decodeToken } from '@/middlewares';

import { routes } from '@/routes';

const clientUrl = config.get<string>('clientUrl');

export const createServer = () => {
  const app = express();

  app.get('/', (req, res) => res.send('Starter Plan API is running.'));

  // Security.
  app.use(helmet());

  // CORS policy.
  app.use(
    cors({
      origin: clientUrl,
      credentials: true,
      methods: ['POST', 'GET', 'PATCH', 'DELETE'],
    })
  );

  // Body parser.
  app.use((req, res, next) => {
    req.path !== '/webhook' ? express.json()(req, res, next) : next();
  });

  // Cookie(s).
  app.use(cookieParser());

  // Token(s).
  app.use(decodeToken);

  // Route(s).
  routes.forEach((route) => app.use(route));

  return app;
};
