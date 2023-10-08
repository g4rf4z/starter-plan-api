import { Express } from 'express';

import { validate } from '@/middlewares/validation.middleware';
import { requireAuthentication } from '@/middlewares/requireAuthentication.middleware';

import { createUserSchema } from '@/schemas/user/createUser.schema';
import { readUserSchema } from '@/schemas/user/readUser.schema';
import { loginSchema } from '@/schemas/session/login.schema';
import { retrieveSessionSchema } from '@/schemas/session/retrieveSession.schema';
import { logoutSchema } from '@/schemas/session/logout.schema';
import { resetPasswordSchema } from '@/schemas/session/resetPasswordToken.schema';
import { setNewPasswordSchema } from '@/schemas/session/setNewPassword.schema';
import { readCartSchema } from '@/schemas/cart/readCart.schema';
import { createCartItemSchema } from '@/schemas/cartItem/createCartItem.schema';
import { updateCartItemSchema } from '@/schemas/cartItem/updateCartItem.schema';
import { createPaymentIntentSchema } from '@/schemas/payment/createPaymentIntent.schema';

import { createUserController } from '@/controllers/user/createUser.controller';
import { readUserController } from '@/controllers/user/readUser.controller';
import { loginController } from '@/controllers/session/login.controller';
import { retrieveSessionController } from '@/controllers/session/retrieveSession.controller';
import { logoutController } from '@/controllers/session/logout.controller';
import { resetPasswordController } from '@/controllers/session/resetPasswordToken.controller';
import { setNewPasswordController } from '@/controllers/session/setNewPassword.controller';
import { readCartController } from '@/controllers/cart/readCart.controller';
import { createCartItemController } from '@/controllers/cartItem/createCartItem.controller';
import { updateCartItemController } from '@/controllers/cartItem/updateCartItem.controller';
import { readPublishableKeyController } from '@/controllers/payment/readPublishableKey.controller';
import { createPaymentIntentController } from '@/controllers/payment/createPaymentIntent.controller';
import { readPaymentIntentsController } from '@/controllers/payment/readPaymentIntents.controller';

export const routes = (app: Express) => {
  app.get('/', (req, res) => {
    return res.send('Hello World !');
  });

  // User route(s).
  app.post('/users', validate(createUserSchema), createUserController);
  app.get('/users', validate(readUserSchema), readUserController);

  // Session route(s).
  app.post('/login', validate(loginSchema), loginController);
  app.post(
    '/logout',
    requireAuthentication,
    validate(logoutSchema),
    logoutController
  );
  app.get(
    '/retrieve-session',
    requireAuthentication,
    validate(retrieveSessionSchema),
    retrieveSessionController
  );
  app.post(
    '/reset-password',
    validate(resetPasswordSchema),
    resetPasswordController
  );
  app.post(
    '/:userId/set-new-password/:token',
    validate(setNewPasswordSchema),
    setNewPasswordController
  );

  // Cart route(s).
  app.get('/carts/:userId', validate(readCartSchema), readCartController);

  // Cart Item route(s).
  app.post(
    '/cart-items/:productId',
    validate(createCartItemSchema),
    createCartItemController
  );
  app.patch(
    '/cart-items/:cartId/:id',
    validate(updateCartItemSchema),
    updateCartItemController
  );

  // Stripe route(s).
  app.post(
    '/create-payment-intent',
    validate(createPaymentIntentSchema),
    createPaymentIntentController
  );
  app.get('/read-payment-intents', readPaymentIntentsController);
  app.get('/config', readPublishableKeyController);
};
