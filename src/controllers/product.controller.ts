import { Request, Response } from 'express';

import {
  createProductService,
  findProductService,
  findProductsService,
} from '../services/product.service';

import type {
  CreateProductInput,
  FindProductInput,
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

export const findProductController = async (
  req: Request<FindProductInput['params'], {}, {}>,
  res: Response
) => {
  try {
    const findProductOptions = {
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

    const foundProduct = await findProductService(
      req.params,
      findProductOptions
    );

    return foundProduct;
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
