import { Request, Response, NextFunction } from 'express';

import { IUser } from '@/models/user/user.entity';

import { UserProductDatabase } from '@/models/userProduct/userProduct.database';

export const readAllUserProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id as IUser['id'];

    const userProductDb = new UserProductDatabase();

    const userProducts = await userProductDb.readAll({ userId });
    return res.status(200).json(userProducts);
  } catch (error) {
    return next(error);
  }
};
