import express from 'express';

import { validate } from '@/middlewares';

import {
  createCheckoutSessionController,
  webhookController,
} from '@/controllers';

const router = express.Router();

router.post('/create-checkout-session', createCheckoutSessionController);
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  webhookController
);

export { router as paymentRoutes };
