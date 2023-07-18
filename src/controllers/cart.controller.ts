import { Request, Response } from 'express';

import { createCartService } from '../services/cart.service';

import { CreateCartInput } from '../schemas/cart.schema';

import { handleError } from '../utils/errors.util';

export const createCartController = async (
  req: Request<{}, {}, CreateCartInput['body']>,
  res: Response
) => {
  try {
    const createCartOptions = {
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        productId: true,
      },
    };

    const createdCart = await createCartService(req.body, createCartOptions);

    return res.send(createdCart);
  } catch (error) {
    return handleError(error, res);
  }
};
