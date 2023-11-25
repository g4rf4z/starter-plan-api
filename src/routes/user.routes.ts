import express from 'express';

import { requireAuthentication, validateSchema } from '@/middlewares';

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

router.post('/users', validateSchema(createUserSchema), createUserController);
router.get('/users', requireAuthentication, readUserController);
router.patch(
  '/users',
  requireAuthentication,
  validateSchema(updateUserSchema),
  updateUserController
);
router.patch(
  '/users/password',
  requireAuthentication,
  validateSchema(updateUserPasswordSchema),
  updateUserPasswordController
);
router.delete('/users', deleteUserController);

export { router as userRoutes };
