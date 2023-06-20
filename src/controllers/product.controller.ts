import { Request, Response } from 'express';

import {
  createProductService,
  findProductsService,
} from '../services/product.service';

import type {
  CreateProductInput,
  FindProductsInput,
} from '../schemas/product.schema';

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

export const findProductsController = async (
  req: Request<{}, {}, FindProductsInput['body']>,
  res: Response
) => {
  try {
    const findProductsOptions = {
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

    const foundProduct = await findProductsService(
      req.params,
      findProductsOptions
    );

    return res.send(foundProduct);
  } catch (error) {
    return handleError(error, res);
  }
};
