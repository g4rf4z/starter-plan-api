import { Request, Response, NextFunction } from 'express';

import { IUser } from '@/models/user/user.entity';

import { CartDatabase } from '@/models/cart/cart.database';
import { CartItemDatabase } from '@/models/cartItem/cartItem.database';

import type { CreateCartItemInput } from '@/schemas/cartItem/createCartItem.schema';
import { ProductDatabase } from '@/models/product/product.database';

export const createCartItemController = async (
  req: Request<CreateCartItemInput['params'], CreateCartItemInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id as IUser['id'];
    const { productId } = req.params;
    const { quantity } = req.body;

    const cartDb = new CartDatabase();
    const cartItemDb = new CartItemDatabase();
    const productDb = new ProductDatabase();

    const cart = await cartDb.readByUserId({ userId });
    const cartId = cart.id;

    try {
      // Check if the cartItem is already in the user's cart.
      // Get the product from the cartItem in the user's cart.
      const [isCartItemExisting, product] = await Promise.all([
        cartItemDb.readByCartIdAndProductId({ cartId, productId }),
        productDb.read({ id: productId }),
      ]);

      // Return message to inform the user.
      if (isCartItemExisting) {
        return res.status(400).json({
          message: `${product.name} has already been added to your cart.`,
        });
      }
    } catch (error) {
      // Add the cartItem in the user's cart.
      const cartItem = await cartItemDb.create({
        quantity,
        cartId,
        productId,
      });
      return res.status(201).json(cartItem);
    }
  } catch (error) {
    return next(error);
  }
};

// import { Request, Response, NextFunction } from 'express';

// import { IUser } from '@/models/user/user.entity';

// import { CartDatabase } from '@/models/cart/cart.database';
// import { CartItemDatabase } from '@/models/cartItem/cartItem.database';

// import type { CreateCartItemInput } from '@/schemas/cartItem/createCartItem.schema';

// export const createCartItemController = async (
//   req: Request<CreateCartItemInput['params'], CreateCartItemInput['body']>,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const userId = res.locals.user.id as IUser['id'];
//     const { productId } = req.params;
//     const { quantity } = req.body;

//     const cartDb = new CartDatabase();
//     const cartItemDb = new CartItemDatabase();

//     // Get authenticated user's shopping cart.
//     const cart = await cartDb.readByUserId({ userId });
//     const cartId = cart.id;

//     let cartItem;

//     try {
//       // Check if cartItem isn't already in the user's shopping cart.
//       const isCartItemExisting = await cartItemDb.readByCartIdAndProductId({ cartId, productId });

//       cartItem = await cartItemDb.update({
//         id: isCartItemExisting.id,
//         quantity: isCartItemExisting.quantity + quantity,
//       });
//     } catch (error) {
//       // If cartItem is already in user's shopping cart, update the quantity.
//       cartItem = await cartItemDb.create({
//         quantity,
//         cartId,
//         productId,
//       });
//     }

//     return res.status(201).json(cartItem);
//   } catch (error) {
//     return next(error);
//   }
// };
