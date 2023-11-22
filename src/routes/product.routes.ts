import express from 'express';

import { validateSchema } from '@/middlewares';

import { readProductSchema } from '@/schemas';

import { readProduct, readAllProducts } from '@/controllers';

const router = express.Router();

router.get('/products/:id', validateSchema(readProductSchema), readProduct);
router.get('/products', readAllProducts);

export { router as productRoutes };
