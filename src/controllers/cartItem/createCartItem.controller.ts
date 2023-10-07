import { Request, Response, NextFunction } from 'express';

import { IUser } from '@/models/user/user.entity';

import { UserDatabase } from '@/models/user/user.database';
import { CartDatabase } from '@/models/cart/cart.database';
import { CartItemDatabase } from '@/models/cartItem/cartItem.database';
import { ProductDatabase } from '@/models/product/product.database';

import type { CreateCartItemInput } from '@/schemas/cartItem/createCartItem.schema';

import { handleError } from '@/utils/errors.util';

export const createCartItemController = async (
  req: Request<CreateCartItemInput['params'], {}, CreateCartItemInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id as IUser['id'];
    const { productId, quantity } = req.body;

    const userDb = new UserDatabase();
    const cartDb = new CartDatabase();
    const cartItemDb = new CartItemDatabase();
    const productDb = new ProductDatabase();

    const user = await userDb.readUser(userId);
    const cart = await cartDb.readCart(userId);

    const cartId = cart.id;

    // Create a carte item in the database.
    // A cart item represents a specific product with variables in a user's cart.
    const cartItem = await cartItemDb.createCartItem({
      cartId,
      productId,
      quantity,
    });
    // Read a product in the database.
    const product = await productDb.readProduct(productId);
    return res.status(201).json({ cartItem, product });
  } catch (error) {
    return handleError(error, res);
  }
};
