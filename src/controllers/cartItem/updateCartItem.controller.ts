import { NextFunction, Request, Response } from 'express';

import { CartItemDatabase } from '@/models/cartItem/cartItem.database';
import { ProductDatabase } from '@/models/product/product.database';

import type { UpdateCartItemInput } from '@/schemas/cartItem/updateCartItem.schema';

import { handleError } from '@/utils/errors.util';

export const updateCartItemController = async (
  req: Request<UpdateCartItemInput['params'], {}, UpdateCartItemInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cartId, id } = req.params;
    const { productId, quantity } = req.body;

    const cartItemDb = new CartItemDatabase();
    const productDb = new ProductDatabase();

    // Update a cart item in the database.
    // A cart item represents a specific product with variables in a user's cart.
    const cartItem = await cartItemDb.updateCartItem({
      id,
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
