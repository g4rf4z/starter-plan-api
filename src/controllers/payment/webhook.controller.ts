import config from 'config';

import { Request, Response, NextFunction } from 'express';

import { stripe } from '@/services/stripe.service';

import { IUser } from '@/models/user/user.entity';

import { CartDatabase } from '@/models/cart/cart.database';
import { CartItemDatabase } from '@/models/cartItem/cartItem.database';
import { UserProductDatabase } from '@/models/userProduct/userProduct.database';

const stripeWebhookSigningSecret = config.get<string>('stripeWebhookSigningSecret');

export const webhookController = async (req: Request, res: Response, next: NextFunction) => {
  const stripePayload = req.body;
  const stripeSignature = req.headers['stripe-signature'] as string;

  const cartDb = new CartDatabase();
  const cartItemDb = new CartItemDatabase();
  const userProductDb = new UserProductDatabase();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      stripePayload,
      stripeSignature,
      stripeWebhookSigningSecret
    );
  } catch (error) {
    console.error(`Webhook validation error: ${error}.`);
    return res.status(400).send(error);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSession = event.data.object;

      if (checkoutSession.payment_status === 'paid' && checkoutSession.status === 'complete') {
        const userId = checkoutSession.client_reference_id as IUser['id'];

        if (checkoutSession.metadata) {
          const purchasedProductIds = checkoutSession.metadata.purchased_product_ids;
          const productIds = JSON.parse(purchasedProductIds);

          // Register products purchased by the user.
          try {
            const userProduct = productIds.map((productId: string) =>
              userProductDb.create({ userId, productId })
            );

            await Promise.all(userProduct);

            // Delete all cart items from the user's cart.
            const cart = await cartDb.readByUserId({ userId });
            const cartId = cart.id;

            await cartItemDb.deleteAll({ cartId });

            return res.status(204).send();
          } catch (error) {
            console.error(`Error processing checkout session: ${error}.`);
            return next(error);
          }
        }
        return res.status(200).json({ status: true });
      } else {
        return res.status(402).json({ status: false });
      }
  }
  return res.sendStatus(200);
};
