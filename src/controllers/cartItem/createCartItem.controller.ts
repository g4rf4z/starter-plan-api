import { NextFunction, Request, Response } from 'express';

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
    const { cartId } = req.params;
    const { productId, quantity } = req.body;

    const cartItemDb = new CartItemDatabase();
    const productDb = new ProductDatabase();

    // Create a cart item in the database.
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
