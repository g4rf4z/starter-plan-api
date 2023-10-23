import { Express } from 'express';

import { validate } from '@/middlewares/validation.middleware';
import { requireAuthentication } from '@/middlewares/requireAuthentication.middleware';

import { createUserSchema } from '@/schemas/user/createUser.schema';
import { updateUserSchema } from '@/schemas/user/updateUser.schema';
import { updateUserPasswordSchema } from '@/schemas/user/updateUserPassword.schema';
import { loginSchema } from '@/schemas/session/login.schema';
import { resetPasswordSchema } from '@/schemas/session/resetPasswordToken.schema';
import { setNewPasswordSchema } from '@/schemas/session/setNewPassword.schema';
import { createCartItemSchema } from '@/schemas/cartItem/createCartItem.schema';
import { readCartItemSchema } from '@/schemas/cartItem/readCartItem.schema';
import { updateCartItemSchema } from '@/schemas/cartItem/updateCartItem.schema';
import { deleteCartItemSchema } from '@/schemas/cartItem/deleteCartItem.schema';
import { readProductSchema } from '@/schemas/product/readProduct.schema';

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
import { readCartItemController } from '@/controllers/cartItem/readCartItem.controller';
import { readAllCartItemsController } from '@/controllers/cartItem/readAllCartItems.controller';
import { updateCartItemController } from '@/controllers/cartItem/updateCartItem.controller';
import { deleteCartItemController } from '@/controllers/cartItem/deleteCartItem.controller';
import { readProduct } from '@/controllers/product/readProduct.controller';
import { readAllProducts } from '@/controllers/product/readAllProducts.controller';
import { createCheckoutSessionController } from '@/controllers/payment/createCheckoutSession.controller';
import { webhookController } from './controllers/payment/webhook.controller';

export const routes = (app: Express) => {
  app.get('/', (req, res) => {
    return res.send('Hello World !');
  });

  // User route(s).
  app.post('/users', validate(createUserSchema), createUserController);
  app.get('/users', requireAuthentication, readUserController);
  app.patch(
    '/users',
    requireAuthentication,
    validate(updateUserSchema),
    updateUserController
  );
  app.patch(
    '/users/password',
    requireAuthentication,
    validate(updateUserPasswordSchema),
    updateUserPasswordController
  );
  app.delete('/users', deleteUserController);

  // Session route(s).
  app.post('/login', validate(loginSchema), loginController);
  app.post('/logout', requireAuthentication, logoutController);
  app.get(
    '/retrieve-session',
    requireAuthentication,
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
  app.get('/carts', requireAuthentication, readCartController);

  // Cart Item route(s).
  app.post(
    '/cart-items/:productId',
    requireAuthentication,
    validate(createCartItemSchema),
    createCartItemController
  );
  app.get(
    '/cart-items/:id',
    requireAuthentication,
    validate(readCartItemSchema),
    readCartItemController
  );
  app.get('/cart-items', requireAuthentication, readAllCartItemsController);
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

  // Products
  app.get('/products/:id', validate(readProductSchema), readProduct);
  app.get('/products', readAllProducts);

  // Payment route(s).
  app.post('/create-checkout-session', createCheckoutSessionController);
  app.post('/webhook', webhookController);
};
