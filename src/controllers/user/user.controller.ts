import { Request, Response } from 'express';

import {
  createUserService,
  findUserService,
  findUsersService,
  updateUserService,
  deleteUserService,
} from '../../services/user/user.service';

import {
  CreateUserInput,
  FindUserInput,
  FindUsersInput,
  UpdateUserInput,
  DeleteUserInput,
} from '../../schemas/user/user.schema';

import {
  createCartService,
  deleteCartService,
  findCartService,
} from '../../services/cart/cart.service';

import { handleError } from '../../utils/errors.util';

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
        cart: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
          },
        },
      },
    };

    // Création d'un utilisateur.
    const createdUser = await createUserService(req.body, createUserOptions);

    // Création du panier associé à l'utilisateur.
    const createdCart = await createCartService({ userId: createdUser.id });

    return res.send({ user: createdUser, cart: createdCart });
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
        cart: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
          },
        },
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
        cart: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
          },
        },
      },
    };

    const foundUsers = await findUsersService(req.params, findUsersOptions);

    return res.send(foundUsers);
  } catch (error) {
    return handleError(error, res);
  }
};

export const updateUserController = async (
  req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>,
  res: Response
) => {
  try {
    const updateUserOptions = {
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        firstname: true,
        lastname: true,
        email: true,
      },
    };

    const updatedUser = await updateUserService(
      { id: req.params.id },
      req.body,
      updateUserOptions
    );

    return res.send(updatedUser);
  } catch (error) {
    return handleError(error, res);
  }
};

export const deleteUserController = async (
  req: Request<DeleteUserInput['params'], {}, {}>,
  res: Response
) => {
  try {
    const deleteUserOptions = {
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        firstname: true,
        lastname: true,
        email: true,
        cart: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
          },
        },
      },
    };

    const foundUser = await findUserService(req.params, deleteUserOptions);
    console.log(foundUser);

    await deleteCartService({ id: foundUser.cart.id });

    // Recherche du panier associé à l'utilisateur.
    // const foundCart = await findCartService();

    // Suppression du panier associé à l'utilisateur.
    // const deletedCart = await deleteCartService();

    // Suppression de l'utilisateur.
    const deletedUser = await deleteUserService(req.params, deleteUserOptions);

    return res.send(deletedUser);
  } catch (error) {
    return handleError(error, res);
  }
};
