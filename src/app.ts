import dotenv from 'dotenv';
dotenv.config();
import config from 'config';

import { createServer } from '@/server/createServer';

const port = config.get<number>('port');
const apiUrl = config.get<string>('apiUrl');

const app = createServer();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

app.listen(port, async () => {
  console.info(`Server is running on : ${apiUrl}, and port : ${port}.`);
});
