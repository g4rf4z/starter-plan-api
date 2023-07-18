import { Request, Response } from 'express';

import {
  createUserService,
  findUserService,
  findUsersService,
} from '../services/user.service';

import {
  CreateUserInput,
  FindUserInput,
  FindUsersInput,
} from '../schemas/user.schema';

import { handleError } from '../utils/errors.util';

export const createUserController = async (
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) => {
  try {
    const createUserOptions = {
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        firstname: true,
        lastname: true,
        email: true,
      },
    };

    const createdUser = await createUserService(req.body, createUserOptions);

    return res.send(createdUser);
  } catch (error) {
    return handleError(error, res);
  }
};

export const findUserController = async (
  req: Request<FindUserInput['params'], {}, {}>,
  res: Response
) => {
  try {
    const findUserOptions = {
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        firstname: true,
        lastname: true,
        email: true,
      },
    };

    const foundUser = await findUserService(req.params, findUserOptions);

    return res.send(foundUser);
  } catch (error) {
    return handleError(error, res);
  }
};

export const findUsersController = async (
  req: Request<{}, {}, FindUsersInput['body']>,
  res: Response
) => {
  try {
    const findUsersOptions = {
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        firstname: true,
        lastname: true,
        email: true,
      },
    };

    const foundUsers = await findUsersService(req.params, findUsersOptions);

    return res.send(foundUsers);
  } catch (error) {
    return handleError(error, res);
  }
};
