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
    const products = await productDb.readAll();
    const userProducts = await userProductDb.readAll({ userId });

    const purchasedUserProductIds = userProducts.map(
      (userProduct) => userProduct.productId
    );

    const purchasedUserProductIdsSet = new Set(purchasedUserProductIds);

    const commonProductIds = cartItems
      .filter((cartItem) => purchasedUserProductIdsSet.has(cartItem.productId))
      .map((cartItem) => cartItem.productId);
    console.log(commonProductIds);

    const lineItems = [];

    for (const cartItem of cartItems) {
      if (purchasedUserProductIdsSet.has(cartItem.productId)) {
        throw new Error(`product_already_purchased: ${cartItem.productId}`);
      }

      const product = products.find((p) => p.id === cartItem.productId);
      if (!product) {
        throw new Error(`product_not_found`);
      }

      lineItems.push({
        price: product.stripePriceId,
        quantity: cartItem.quantity,
      });
    }

    const purchasedProductIds = cartItems.map((cartItem) => cartItem.productId);

    const checkoutSession = await stripe.checkout.sessions.create({
      client_reference_id: userId,
      line_items: lineItems,
      billing_address_collection: 'required',
      mode: 'payment',
      automatic_tax: {
        enabled: true,
      },
      metadata: {
        purchased_product_ids: JSON.stringify(purchasedProductIds),
      },
      success_url: `${apiUrl}:${port}/success`,
      cancel_url: `${apiUrl}:${port}/cancel`,
    });
    return res.status(303).send(checkoutSession.url);
  } catch (error) {
    return next(error);
  }
};
