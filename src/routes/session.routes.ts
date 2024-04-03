import express from 'express';

import { requireAuthentication, validateSchema } from '@/middlewares';

import {
  loginSchema,
  resetPasswordSchema,
  setNewPasswordSchema,
} from '@/schemas';

import {
  loginController,
  logoutController,
  resetPasswordController,
  retrieveSessionController,
  setNewPasswordController,
} from '@/controllers';

const router = express.Router();

router.post('/login', validateSchema(loginSchema), loginController);
router.post('/logout', requireAuthentication, logoutController);
router.get(
  '/retrieve-session',
  requireAuthentication,
  retrieveSessionController
);
router.post(
  '/reset-password',
  validateSchema(resetPasswordSchema),
  resetPasswordController
);
router.post(
  '/set-password/:userId/:token',
  validateSchema(setNewPasswordSchema),
  setNewPasswordController
);

export { router as sessionRoutes };
