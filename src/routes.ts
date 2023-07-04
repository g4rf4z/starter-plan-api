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

import {
  createPaymentIntentController,
  findPaymentIntentsController,
} from './controllers/paymentIntent.controller';

const routes = (app: Express) => {
  app.get('/', (req, res) => {
    return res.send('Hello World !');
  });

  // ---------- Buyers routes ----------
  app.post('/buyers', [validate(createBuyerSchema)], createBuyerController);
  app.get('/buyers/:id', [validate(findBuyerSchema)], findBuyerController);
  app.get('/buyers', [validate(findBuyersSchema)], findBuyersController);

  // ---------- Products routes ----------
  app.post(
    '/products',
    [validate(createProductSchema)],
    createProductController
  );
  app.get(
    '/products/:id',
    [validate(findProductSchema)],
    findProductController
  );
  app.get('/products', [validate(findProductsSchema)], findProductsController);

  // ---------- Payments routes ----------
  app.post('/payments', createPaymentIntentController);
  app.get('/payments', findPaymentIntentsController);
};

export default routes;
