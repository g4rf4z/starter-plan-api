import config from 'config';

import { Request, Response, NextFunction } from 'express';

import { stripe } from '@/services/stripe.service';

import { IUser } from '@/models/user/user.entity';
import { UserProductDatabase } from '@/models/userProduct/userProduct.database';

const stripeWebhookSigningSecret = config.get<string>(
  'stripeWebhookSigningSecret'
);

export const webhookController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const stripePayload = req.body;
  const stripeSignature = req.headers['stripe-signature'] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      stripePayload,
      stripeSignature,
      stripeWebhookSigningSecret
    );
  } catch (error) {
    console.error(`Erreur de validation de Webhook : ${error}.`);
    return res.status(400).send(error);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSession = event.data.object;
      console.log(checkoutSession);

      if (
        checkoutSession.payment_status === 'paid' &&
        checkoutSession.status === 'complete'
      ) {
        const userId = checkoutSession.client_reference_id as IUser['id'];

        if (checkoutSession.metadata) {
          const purchasedProductIds =
            checkoutSession.metadata.purchased_product_ids;
          const productIds = JSON.parse(purchasedProductIds);

          const userProductDb = new UserProductDatabase();

          productIds.forEach(async (productId: string) => {
            try {
              const result = await userProductDb.create({ userId, productId });
              console.log(result);
            } catch (error) {
              console.error(
                'Erreur lors de la création du UserProduct :',
                error
              );
            }
          });
        }
        return res.status(200).json({ status: true }); // Payment succesful.
      } else {
        return res.status(402).json({ status: false }); // Payment failed.
      }
    default:
      console.warn(`Unhandled event type ${event.type}.`);
  }
  return res.status(200).json({ received: true });
};
