import config from 'config';

import { Request, Response, NextFunction } from 'express';

import { stripe } from '@/services/stripe.service';

import { IUser } from '@/models/user/user.entity';

import { CartDatabase } from '@/models/cart/cart.database';
import { CartItemDatabase } from '@/models/cartItem/cartItem.database';
import { ProductDatabase } from '@/models/product/product.database';
import { UserProductDatabase } from '@/models/userProduct/userProduct.database';

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
    const userProductDb = new UserProductDatabase();

    const cart = await cartDb.readByUserId({ userId });
    const cartItems = await cartItemDb.readAll({ cartId: cart.id });
    if (cartItems.length === 0) {
      throw new Error('Cart empty.');
    }

    const userProducts = await userProductDb.readAll({ userId });
    const userProductIds = new Set(
      userProducts.map((userProduct) => userProduct.productId)
    );

    const purchasedProductIds: string[] = [];
    const cartProductIds: string[] = [];
    const lineItems: { price: string; quantity: number }[] = [];

    const products = await productDb.readAll();
    cartItems.forEach((cartItem) => {
      if (userProductIds.has(cartItem.productId)) {
        purchasedProductIds.push(cartItem.productId);
      } else {
        const matchingProduct = products.find(
          (product) => product.id === cartItem.productId
        );
        cartProductIds.push(cartItem.productId);

        if (!matchingProduct) {
          throw new Error(`Product not found : ${cartItem.productId}.`);
        }

        lineItems.push({
          price: matchingProduct.stripePriceId,
          quantity: cartItem.quantity,
        });
      }
    });

    if (purchasedProductIds.length > 0) {
      throw new Error(
        `Product(s) already purchased : ${purchasedProductIds.join(', ')}.`
      );
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      client_reference_id: userId,
      line_items: lineItems,
      billing_address_collection: 'required',
      mode: 'payment',
      automatic_tax: {
        enabled: true,
      },
      metadata: {
        purchased_product_ids: JSON.stringify(cartProductIds),
      },
      success_url: `${apiUrl}:${port}/success`,
      cancel_url: `${apiUrl}:${port}/cancel`,
    });
    return res.status(303).send(checkoutSession.url);
  } catch (error) {
    return next(error);
  }
};
