import { Express } from 'express';

import { requireAuthentication } from '@/middlewares/requireAuthentication.middleware';
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
import { updateCartItemController } from './controllers/cartItem/updateCartItem.controller';
import { updateCartItemSchema } from './schemas/cartItem/updateCartItem.schema';
import { loginController } from './controllers/session/login.controller';
import { loginSchema } from './schemas/session/login.schema';
import { logoutController } from './controllers/session/logout.controller';
import { logoutSchema } from './schemas/session/logout.schema';
import { retrieveSessionController } from './controllers/session/retrieveSession.controller';
import { retrieveSessionSchema } from './schemas/session/retrieveSession.schema';

import { resetPasswordController } from './controllers/session/resetPasswordToken.controller';
import { resetPasswordSchema } from './schemas/session/resetPasswordToken.schema';

const routes = (app: Express) => {
  app.get('/', (req, res) => {
    return res.send('Hello World !');
  });

  // ---------- User routes ----------
  app.post('/users', validate(createUserSchema), createUserController);
  app.get('/users', validate(readUserSchema), readUserController);
  app.post('/login', validate(loginSchema), loginController);
  app.post(
    '/logout',
    requireAuthentication,
    validate(logoutSchema),
    logoutController
  );
  app.get(
    '/retrieve-session',
    [requireAuthentication, validate(retrieveSessionSchema)],
    retrieveSessionController
  );
  app.post(
    '/reset-password',
    validate(resetPasswordSchema),
    resetPasswordController
  );
  // app.post(
  //   '/:userId/set-new-password/:token',
  //   validate(setNewPasswordSchema),
  //   setNewPasswordController
  // );

  // ---------- Cart routes ----------
  app.get('/carts/:userId', validate(readCartSchema), readCartController);

  // ---------- Cart Item routes ----------
  app.post(
    '/cart-items',
    validate(createCartItemSchema),
    createCartItemController
  );
  app.patch(
    '/cart-items/:cartId/:id',
    validate(updateCartItemSchema),
    updateCartItemController
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
