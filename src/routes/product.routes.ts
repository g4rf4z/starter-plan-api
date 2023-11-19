import express from 'express';

import { validate } from '@/middlewares';

import { readProductSchema } from '@/schemas';

import { readProduct, readAllProducts } from '@/controllers';

const router = express.Router();

router.get('/products/:id', validate(readProductSchema), readProduct);
router.get('/products', readAllProducts);

export { router as productRoutes };
