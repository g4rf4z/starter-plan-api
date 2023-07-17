import { Request, Response } from 'express';

import { createCartService } from '../services/cart.service';

import { CreateCartInput } from '../schemas/cart.schema';

import { handleError } from '../utils/errors.util';

export const createCartController = async (
  req: Request<{}, {}, CreateCartInput['body']>,
  res: Response
) => {
  // const { buyerId, productId } = req.body;
  try {
    const createCartOptions = {
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        buyerId: true,
        productId: true,
      },
    };

    const createdCart = await createCartService(req.body, createCartOptions);

    return res.send(createdCart);
  } catch (error) {
    return handleError(error, res);
  }
};
