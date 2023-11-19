import express from 'express';

import { requireAuthentication } from '@/middlewares';

import { readAllUserProductsController } from '@/controllers';

const router = express.Router();

router.get(
  '/user-products',
  requireAuthentication,
  readAllUserProductsController
);

export { router as userProductRoutes };
