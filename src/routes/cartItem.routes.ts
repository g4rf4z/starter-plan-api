import express from 'express';

import { requireAuthentication, validate } from '@/middlewares';

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
  validate(createCartItemSchema),
  createCartItemController
);
router.get(
  '/cart-items/:id',
  requireAuthentication,
  validate(readCartItemSchema),
  readCartItemController
);
router.get('/cart-items', requireAuthentication, readAllCartItemsController);
router.patch(
  '/cart-items/:id',
  requireAuthentication,
  validate(updateCartItemSchema),
  updateCartItemController
);
router.delete(
  '/cart-items/:id',
  requireAuthentication,
  validate(deleteCartItemSchema),
  deleteCartItemController
);

export { router as cartItemRoutes };
