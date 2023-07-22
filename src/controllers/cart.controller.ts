import { Request, Response } from 'express';

import { findCartService } from '../services/cart.service';

import { FindCartInput } from '../schemas/cart.schema';

import { handleError } from '../utils/errors.util';

export const findCartController = async (
  req: Request<FindCartInput['params'], {}, {}>,
  res: Response
) => {
  try {
    const findCartOptions = {
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      },
    };

    const foundCart = await findCartService(req.params, findCartOptions);

    return res.send(foundCart);
  } catch (error) {
    return handleError(error, res);
  }
};
