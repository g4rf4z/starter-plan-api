import { Express } from 'express';

import { validate } from './middlewares/validation.middleware';

import {
  registerSchema,
  findUsersSchema,
  updateUserSchema,
} from './schemas/user/user.schema';

import { readUserSchema } from './schemas/user/readUser.schema';

import { registerController } from './controllers/user/register.controller';

import {
  createProductSchema,
  findProductsSchema,
} from './schemas/product/product.schema';

import { createPaymentIntentSchema } from './schemas/payment/paymentIntent.schema';

import {
  createPaymentIntentController,
  findPaymentIntentsController,
} from './controllers/payment/paymentIntent.controller';

import { findPublishableKeyController } from './controllers/payment/publishableKey.controller';

import { findCartSchema } from './schemas/cart/cart.schema';

import { findCartController } from './controllers/cart/cart.controller';

import { createCartItemSchema } from './schemas/cartItem/cartItem.schema';

import { fetchUserController } from './controllers/user/fetchUser.controller';
import { createCartItemController } from './controllers/cartItem/cartItem.controller';

const routes = (app: Express) => {
  app.get('/', (req, res) => {
    return res.send('Hello World !');
  });

  // ---------- User routes ----------
  app.post('/users', validate(registerSchema), registerController);
  app.get('/users/:id', validate(readUserSchema), fetchUserController);

  // cart item routes
  app.post(
    '/cart-items/:cartId',
    validate(createCartItemSchema),
    createCartItemController
  );
  // app.get('/users', validate(findUsersSchema), findUsersController);
  // app.patch('/users/:id', validate(updateUserSchema), updateUserController);
  // app.delete('/users/:id', deleteUserController);

  // // ---------- Products routes ----------
  // app.post('/products', validate(createProductSchema), createProductController);
  // app.get('/products/:id', validate(findProductSchema), findProductController);
  // app.get('/products', validate(findProductsSchema), findProductsController);

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
};

export default routes;
