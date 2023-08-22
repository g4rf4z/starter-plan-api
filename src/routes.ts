import { Express } from 'express';

import { validate } from '@/middlewares/validation.middleware';

import { createUserSchema } from '@/schemas/user/createUser.schema';
import { readUserSchema } from '@/schemas/user/readUser.schema';

import { createCartItemSchema } from '@/schemas/cartItem/createCartItem.schema';

import { createUserController } from '@/controllers/user/createUser.controller';
import { readUserController } from '@/controllers/user/readUser.controller';

import { createCartItemController } from '@/controllers/cartItem/createCartItem.controller';

import { createPaymentIntentSchema } from './schemas/payment/paymentIntent.schema';

import {
  createPaymentIntentController,
  findPaymentIntentsController,
} from './controllers/payment/paymentIntent.controller';

import { findPublishableKeyController } from './controllers/payment/publishableKey.controller';
import { readCartSchema } from './schemas/cart/readCart.schema';
import { readCartController } from './controllers/cart/readCart.controller';

const routes = (app: Express) => {
  app.get('/', (req, res) => {
    return res.send('Hello World !');
  });

  // ---------- User routes ----------
  app.post('/users', validate(createUserSchema), createUserController);
  app.get('/users/:id', validate(readUserSchema), readUserController);

  // ---------- Cart routes ----------
  app.get('/carts/:userId', validate(readCartSchema), readCartController);

  // ---------- Cart Item routes ----------
  app.post(
    '/cart-items/:cartId',
    validate(createCartItemSchema),
    createCartItemController
  );

  // ---------- Stripe routes ----------
  app.post(
    '/create-payment-intent',
    validate(createPaymentIntentSchema),
    createPaymentIntentController
  );
  app.get('/find-payment-intents', findPaymentIntentsController);
  app.get('/config', findPublishableKeyController);
};

export default routes;
