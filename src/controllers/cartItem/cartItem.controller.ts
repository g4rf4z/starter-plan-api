import { Request, Response } from 'express';

import {
  createCartItemService,
  readCartItemService,
} from '../../services/cartItem/cartItem.service';

import type {
  CreateCartItemInput,
  ReadCartItemInput,
} from '../../schemas/cartItem/cartItem.schema';

import { handleError } from '../../utils/errors.util';

export const createCartItemController = async (
  req: Request<CreateCartItemInput['params'], {}, CreateCartItemInput['body']>,
  res: Response
) => {
  try {
    const createCartItemOptions = {
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        productId: true,
      },
    };

    const { cartId } = req.params;
    const { productId } = req.body;

    const createdCartItem = await createCartItemService(
      { cartId, productId },
      createCartItemOptions
    );

    return res.send(createdCartItem);
  } catch (error) {
    return handleError(error, res);
  }
};

export const readCartItemController = async (
  req: Request<{}, {}, ReadCartItemInput['body']>,
  res: Response
) => {
  try {
    const readCartItemOptions = {
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        cartId: true,
        products: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            name: true,
            url: true,
            description: true,
            price: true,
          },
        },
      },
    };

    const readCartItem = await readCartItemService(
      req.params,
      readCartItemOptions
    );

    return res.send({ cartItems: readCartItem });
  } catch (error) {
    return handleError(error, res);
  }
};
