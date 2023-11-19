import express from 'express';

import { requireAuthentication } from '@/middlewares';

import { readCartController } from '@/controllers';

const router = express.Router();

router.get('/carts', requireAuthentication, readCartController);

export { router as cartRoutes };
