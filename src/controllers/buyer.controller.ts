import { Request, Response } from 'express';

import {
  createBuyerService,
  findBuyerService,
  findBuyersService,
} from '../services/buyer.service';

import {
  CreateBuyerInput,
  FindBuyerInput,
  FindBuyersInput,
} from '../schemas/buyer.schema';

import { handleError } from '../utils/errors.util';

export const createBuyerController = async (
  req: Request<{}, {}, CreateBuyerInput['body']>,
  res: Response
) => {
  try {
    const createBuyerOptions = {
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        firstname: true,
        lastname: true,
        email: true,
      },
    };

    const createdBuyer = await createBuyerService(req.body, createBuyerOptions);

    return res.send(createdBuyer);
  } catch (error) {
    return handleError(error, res);
  }
};

export const findBuyerController = async (
  req: Request<FindBuyerInput['params'], {}, {}>,
  res: Response
) => {
  try {
    const findbuyerOptions = {
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        firstname: true,
        lastname: true,
        email: true,
      },
    };

    const foundBuyer = await findBuyerService(req.params, findbuyerOptions);

    return res.send(foundBuyer);
  } catch (error) {
    return handleError(error, res);
  }
};

export const findBuyersController = async (
  req: Request<{}, {}, FindBuyersInput['body']>,
  res: Response
) => {
  try {
    const findBuyersOptions = {
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        firstname: true,
        lastname: true,
        email: true,
      },
    };

    const foundBuyers = await findBuyersService(req.params, findBuyersOptions);

    return res.send(foundBuyers);
  } catch (error) {
    return handleError(error, res);
  }
};
