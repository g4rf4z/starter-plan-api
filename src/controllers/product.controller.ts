import { Request, Response } from 'express';

import { createProductService } from '../services/product.service';

import type { CreateProductInput } from '../schemas/product.schema';

import { handleError } from '../utils/errors.util';

export const createProductController = async (
  req: Request<{}, {}, CreateProductInput['body']>,
  res: Response
) => {
  try {
    const createProductOptions = {
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        url: true,
        description: true,
        price: true,
      },
    };

    const createdProduct = await createProductService(
      req.body,
      createProductOptions
    );

    return res.send(createdProduct);
  } catch (error) {
    return handleError(error, res);
  }
};
