import { Express } from 'express';

import { validate } from './middlewares/validation.middleware';

import {
  createProductSchema,
  findProductsSchema,
} from './schemas/product.schema';

import {
  createProductController,
  findProductsController,
} from './controllers/product.controller';

const routes = (app: Express) => {
  app.get('/', (req, res) => {
    return res.send('Hello World !');
  });

  app.post(
    '/products',
    [validate(createProductSchema)],
    createProductController
  );

  app.get('/products', [validate(findProductsSchema)], findProductsController);
};

export default routes;
