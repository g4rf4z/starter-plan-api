import config from 'config';

import { Request, Response, NextFunction } from 'express';

import { stripe } from '@/services/stripe.service';

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
    console.error(`Erreur de validation de Webhook : ${error}`);
    return res.status(400).send(error);
  }
  console.log(event);
  return res.status(200).send({ received: true });
};
