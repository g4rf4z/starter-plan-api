import config from 'config';

import { Request, Response, NextFunction } from 'express';

import { stripe } from '@/services/stripe.service';

import { IUser } from '@/models/user/user.entity';

import { CartDatabase } from '@/models/cart/cart.database';
import { CartItemDatabase } from '@/models/cartItem/cartItem.database';

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
    // const { line_items } = req.body;

    const cartDb = new CartDatabase();
    const cartItemDb = new CartItemDatabase();

    const cart = await cartDb.readByUserId({ userId });
    const cartId = cart.id;

    const cartItems = await cartItemDb.readAll({ cartId });

    const lineItems = cartItems.map((data) => ({
      price: data.productId,
      quantity: data.quantity,
    }));

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: lineItems,
      billing_address_collection: 'required',
      mode: 'payment',
      automatic_tax: { enabled: true },
      success_url: `${apiUrl}:${port}/success`,
      cancel_url: `${apiUrl}:${port}/cancel`,
    });
    return res.status(303).send(checkoutSession.url);
  } catch (error) {
    return next(error);
  }
};
