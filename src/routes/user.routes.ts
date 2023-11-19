import express from 'express';

import { requireAuthentication, validate } from '@/middlewares';

import {
  createUserSchema,
  updateUserSchema,
  updateUserPasswordSchema,
} from '@/schemas';

import {
  createUserController,
  readUserController,
  updateUserController,
  updateUserPasswordController,
  deleteUserController,
} from '@/controllers';

const router = express.Router();

router.post('/users', validate(createUserSchema), createUserController);
router.get('/users', requireAuthentication, readUserController);
router.patch(
  '/users',
  requireAuthentication,
  validate(updateUserSchema),
  updateUserController
);
router.patch(
  '/users/password',
  requireAuthentication,
  validate(updateUserPasswordSchema),
  updateUserPasswordController
);
router.delete('/users', deleteUserController);

export { router as userRoutes };
