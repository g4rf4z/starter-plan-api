import express from 'express';

import { requireAuthentication, validateSchema } from '@/middlewares';

import {
  createCartItemSchema,
  readCartItemSchema,
  updateCartItemSchema,
  deleteCartItemSchema,
} from '@/schemas';

import {
  createCartItemController,
  readCartItemController,
  readAllCartItemsController,
  updateCartItemController,
  deleteCartItemController,
} from '@/controllers';

const router = express.Router();

router.post(
  '/cart-items/:productId',
  requireAuthentication,
  validateSchema(createCartItemSchema),
  createCartItemController
);
router.get(
  '/cart-items/:id',
  requireAuthentication,
  validateSchema(readCartItemSchema),
  readCartItemController
);
router.get('/cart-items', requireAuthentication, readAllCartItemsController);
router.patch(
  '/cart-items/:id',
  requireAuthentication,
  validateSchema(updateCartItemSchema),
  updateCartItemController
);
router.delete(
  '/cart-items/:id',
  requireAuthentication,
  validateSchema(deleteCartItemSchema),
  deleteCartItemController
);

export { router as cartItemRoutes };
