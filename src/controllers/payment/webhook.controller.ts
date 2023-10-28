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
  const payload = req.body;
  const sig = req.headers['stripe-signature'] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      stripeWebhookSigningSecret
    );
  } catch (error) {
    return res.status(400).send(error);
  }
  console.log(event.type);
  console.log(event.data.object);
  return res.json({ received: true });
};
