import { Express } from 'express';

import { validate } from '@/middlewares/validation.middleware';
import { requireAuthentication } from '@/middlewares/requireAuthentication.middleware';

import { createUserSchema } from '@/schemas/user/createUser.schema';
import { readUserSchema } from '@/schemas/user/readUser.schema';
import { updateUserSchema } from '@/schemas/user/updateUser.schema';
import { updateUserPasswordSchema } from '@/schemas/user/updateUserPassword.schema';
import { deleteUserSchema } from '@/schemas/user/deleteUser.schema';
import { loginSchema } from '@/schemas/session/login.schema';
import { retrieveSessionSchema } from '@/schemas/session/retrieveSession.schema';
import { logoutSchema } from '@/schemas/session/logout.schema';
import { resetPasswordSchema } from '@/schemas/session/resetPasswordToken.schema';
import { setNewPasswordSchema } from '@/schemas/session/setNewPassword.schema';
import { readCartSchema } from '@/schemas/cart/readCart.schema';
import { createCartItemSchema } from '@/schemas/cartItem/createCartItem.schema';
import { updateCartItemSchema } from '@/schemas/cartItem/updateCartItem.schema';
import { deleteCartItemSchema } from '@/schemas/cartItem/deleteCartItem.schema';

import { createUserController } from '@/controllers/user/createUser.controller';
import { readUserController } from '@/controllers/user/readUser.controller';
import { updateUserController } from '@/controllers/user/updateUser.controller';
import { updateUserPasswordController } from '@/controllers/user/updateUserPassword.controller';
import { deleteUserController } from '@/controllers/user/deleteUser.controller';
import { loginController } from '@/controllers/session/login.controller';
import { retrieveSessionController } from '@/controllers/session/retrieveSession.controller';
import { logoutController } from '@/controllers/session/logout.controller';
import { resetPasswordController } from '@/controllers/session/resetPasswordToken.controller';
import { setNewPasswordController } from '@/controllers/session/setNewPassword.controller';
import { readCartController } from '@/controllers/cart/readCart.controller';
import { createCartItemController } from '@/controllers/cartItem/createCartItem.controller';
import { updateCartItemController } from '@/controllers/cartItem/updateCartItem.controller';
import { deleteCartItemController } from '@/controllers/cartItem/deleteCartItem.controller';
import { createCheckoutSessionController } from './controllers/payment/createCheckoutSession.controller';

export const routes = (app: Express) => {
  app.get('/', (req, res) => {
    return res.send('Hello World !');
  });

  // User route(s).
  app.post('/users', validate(createUserSchema), createUserController);
  app.get('/users', validate(readUserSchema), readUserController);
  app.patch('/users', validate(updateUserSchema), updateUserController);
  app.patch(
    '/users/password',
    validate(updateUserPasswordSchema),
    updateUserPasswordController
  );
  app.delete('/users', validate(deleteUserSchema), deleteUserController);

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
    requireAuthentication,
    validate(createCartItemSchema),
    createCartItemController
  );
  app.patch(
    '/cart-items/:id',
    requireAuthentication,
    validate(updateCartItemSchema),
    updateCartItemController
  );
  app.delete(
    '/cart-items/:id',
    requireAuthentication,
    validate(deleteCartItemSchema),
    deleteCartItemController
  );

  // Payment route(s).
  app.post('/create-checkout-session', createCheckoutSessionController);
};
