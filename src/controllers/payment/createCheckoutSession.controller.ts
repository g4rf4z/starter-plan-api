import config from 'config';

import { Request, Response, NextFunction } from 'express';

import { stripe } from '@/services/stripe.service';

import { IUser } from '@/models/user/user.entity';

import { CartDatabase } from '@/models/cart/cart.database';
import { CartItemDatabase } from '@/models/cartItem/cartItem.database';
import { ProductDatabase } from '@/models/product/product.database';

import { createCheckoutSessionInput } from '@/schemas/payment/createCheckoutSession.schema';

const apiUrl = config.get<string>('apiUrl');
const port = config.get<number>('port');

export const createCheckoutSessionController = async (
  req: Request<createCheckoutSessionInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id as IUser['id'];

    const cartDb = new CartDatabase();
    const cartItemDb = new CartItemDatabase();
    const productDb = new ProductDatabase();

    const cart = await cartDb.readByUserId({ userId });
    const cartItems = await cartItemDb.readAll({ cartId: cart.id });
    const products = await productDb.readAll();

    const lineItems = cartItems.map((cartItem) => {
      const product = products.find(
        (product) => product.id === cartItem.productId
      );
      if (!product)
        throw new Error(`Product_ID_${cartItem.productId}_not_found`);
      return {
        price: product.description,
        quantity: cartItem.quantity,
      };
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: lineItems,
      billing_address_collection: 'required',
      mode: 'payment',
      automatic_tax: {
        enabled: true,
      },
      success_url: `${apiUrl}:${port}/success`,
      cancel_url: `${apiUrl}:${port}/cancel`,
    });
    return res.status(303).send(checkoutSession.url);
  } catch (error) {
    return next(error);
  }
};
