import dotenv from 'dotenv';
dotenv.config();
import config from 'config';

import { createServer } from '@/server/createServer';

const port = config.get<number>('port');
const apiUrl = config.get<string>('apiUrl');

const app = createServer();

const server = app.listen(port, async () => {
  console.info(`API is running on ${apiUrl}:${port}.`);
});

const shutdown = (signal: string) => {
  return (err: any) => {
    console.info(`${signal} received. API shutdown in progress...`);
    server.close(() => {
      console.info('API shutdown successful.');
      process.exit(err ? 1 : 0);
    });
  };
};

process.on('SIGINT', shutdown('SIGINT'));
process.on('SIGTERM', shutdown('SIGTERM'));
process.on('uncaughtException', shutdown('uncaughtException'));
process.on('unhandledRejection', shutdown('unhandledRejection'));
