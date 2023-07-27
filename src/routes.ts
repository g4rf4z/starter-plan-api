import { Express } from 'express';

import { validate } from './middlewares/validation.middleware';

import {
  createUserSchema,
  findUserSchema,
  findUsersSchema,
} from './schemas/user/user.schema';

import {
  createUserController,
  findUserController,
  findUsersController,
} from './controllers/user/user.controller';

import {
  createProductSchema,
  findProductSchema,
  findProductsSchema,
} from './schemas/product/product.schema';

import {
  createProductController,
  findProductController,
  findProductsController,
} from './controllers/product/product.controller';

import { createPaymentIntentSchema } from './schemas/payment/paymentIntent.schema';

import {
  createPaymentIntentController,
  findPaymentIntentsController,
} from './controllers/payment/paymentIntent.controller';

import { findPublishableKeyController } from './controllers/payment/publishableKey.controller';

import { findCartSchema } from './schemas/cart/cart.schema';

import { findCartController } from './controllers/cart/cart.controller';

import {
  createCartItemSchema,
  readCartItemSchema,
} from './schemas/cartItem/cartItem.schema';

import {
  createCartItemController,
  readCartItemController,
} from './controllers/cartItem/cartItem.controller';

const routes = (app: Express) => {
  app.get('/', (req, res) => {
    return res.send('Hello World !');
  });

  // ---------- Users routes ----------
  app.post('/users', validate(createUserSchema), createUserController);
  app.get('/users/:id', validate(findUserSchema), findUserController);
  app.get('/users', validate(findUsersSchema), findUsersController);

  // ---------- Products routes ----------
  app.post('/products', validate(createProductSchema), createProductController);
  app.get('/products/:id', validate(findProductSchema), findProductController);
  app.get('/products', validate(findProductsSchema), findProductsController);

  // ---------- Stripe routes ----------
  app.post(
    '/create-payment-intent',
    validate(createPaymentIntentSchema),
    createPaymentIntentController
  );
  app.get('/find-payment-intents', findPaymentIntentsController);
  app.get('/config', findPublishableKeyController);

  // ---------- Cart routes ----------
  app.get('/carts/:id', validate(findCartSchema), findCartController);

  // ---------- Cart item routes
  app.post(
    '/cart/:cartId',
    validate(createCartItemSchema),
    createCartItemController
  );
  app.get(
    '/read-cart-items/:cartId?',
    validate(readCartItemSchema),
    readCartItemController
  );
};

export default routes;
