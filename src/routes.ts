import { Express } from 'express';

import { validate } from './middlewares/validation.middleware';

import { createProductSchema } from './schemas/product.schema';

import { createProductController } from './controllers/product.controller';

const routes = (app: Express) => {
  app.get('/', (req, res) => {
    return res.send('Hello World !');
  });

  app.post(
    '/products',
    [validate(createProductSchema)],
    createProductController
  );
};

export default routes;
