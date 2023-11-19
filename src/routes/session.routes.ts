import express from 'express';

import { requireAuthentication, validate } from '@/middlewares';

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

router.post('/login', validate(loginSchema), loginController);
router.post('/logout', requireAuthentication, logoutController);
router.get(
  '/retrieve-session',
  requireAuthentication,
  retrieveSessionController
);
router.post(
  '/reset-password',
  validate(resetPasswordSchema),
  resetPasswordController
);
router.post(
  '/:userId/set-new-password/:token',
  validate(setNewPasswordSchema),
  setNewPasswordController
);

export { router as sessionRoutes };
