import { Request, Response, NextFunction } from 'express';

import { UserDatabase } from '@/models/user/user.database';
import { CartDatabase } from '@/models/cart/cart.database';

import { RegisterInput } from '@/schemas/user/user.schema';

import { handleError } from '@/utils/errors.util';

export const registerController = async (
  req: Request<{}, {}, RegisterInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    // create user
    const { firstname, lastname, email, password } = req.body;

    const userDb = new UserDatabase();

    const user = await userDb.createUser({
      firstname,
      lastname,
      email,
      password,
    });

    // create user's cart
    const cartDb = new CartDatabase();

    const cart = await cartDb.create({
      userId: user.id,
    });
    return res.status(201).json({ user, cart });
  } catch (error) {
    return handleError(error, res);
  }
};

// export const findUsersController = async (
//   req: Request<{}, {}, FindUsersInput['body']>,
//   res: Response
// ) => {
//   try {
//     const findUsersOptions = {
//       select: {
//         id: true,
//         createdAt: true,
//         updatedAt: true,
//         firstname: true,
//         lastname: true,
//         email: true,
//         cart: {
//           select: {
//             id: true,
//             createdAt: true,
//             updatedAt: true,
//             userId: true,
//           },
//         },
//       },
//     };

//     const foundUsers = await findUsersService(req.params, findUsersOptions);

//     return res.send(foundUsers);
//   } catch (error) {
//     return handleError(error, res);
//   }
// };

// export const updateUserController = async (
//   req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>,
//   res: Response
// ) => {
//   try {
//     const updateUserOptions = {
//       select: {
//         id: true,
//         createdAt: true,
//         updatedAt: true,
//         firstname: true,
//         lastname: true,
//         email: true,
//       },
//     };

//     const updatedUser = await updateUserService(
//       { id: req.params.id },
//       req.body,
//       updateUserOptions
//     );

//     return res.send(updatedUser);
//   } catch (error) {
//     return handleError(error, res);
//   }
// };

// export const deleteUserController = async (
//   req: Request<DeleteUserInput['params'], {}, {}>,
//   res: Response
// ) => {
//   try {
//     const deleteUserOptions = {
//       select: {
//         id: true,
//         createdAt: true,
//         updatedAt: true,
//         firstname: true,
//         lastname: true,
//         email: true,
//       },
//     };

//     const deletedUser = await deleteUserService(req.params, deleteUserOptions);

//     return res.send(deletedUser);
//   } catch (error) {
//     return handleError(error, res);
//   }
// };
