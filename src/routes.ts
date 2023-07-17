import { Express } from 'express';

import { validate } from './middlewares/validation.middleware';

import {
  createBuyerSchema,
  findBuyerSchema,
  findBuyersSchema,
} from './schemas/buyer.schema';

import {
  createBuyerController,
  findBuyerController,
  findBuyersController,
} from './controllers/buyer.controller';

import {
  createProductSchema,
  findProductSchema,
  findProductsSchema,
} from './schemas/product.schema';

import {
  createProductController,
  findProductController,
  findProductsController,
} from './controllers/product.controller';

import { createPaymentIntentSchema } from './schemas/paymentIntent.schema';

import {
  createPaymentIntentController,
  findPaymentIntentsController,
} from './controllers/paymentIntent.controller';

import { findPublishableKeyController } from './controllers/publishableKey.controller';
import { createCartController } from './controllers/cart.controller';

const routes = (app: Express) => {
  app.get('/', (req, res) => {
    return res.send('Hello World !');
  });

  // ---------- Buyers routes ----------
  app.post('/buyers', validate(createBuyerSchema), createBuyerController);
  app.get('/buyers/:id', validate(findBuyerSchema), findBuyerController);
  app.get('/buyers', validate(findBuyersSchema), findBuyersController);

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
  app.post('/cart', createCartController);
};

export default routes;
