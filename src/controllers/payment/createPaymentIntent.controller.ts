import { Request, Response, NextFunction } from 'express';

import { createPaymentIntentService } from '@/services/payment/readPaymentIntents.service';

import { createPaymentIntentInput } from '@/schemas/payment/createPaymentIntent.schema';

export const createPaymentIntentController = async (
  req: Request<{}, {}, createPaymentIntentInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount, currency, enable_automatic_payment } = req.body;

    const paymentIntent = await createPaymentIntentService(amount, currency, {
      enabled: enable_automatic_payment,
    });
    return res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send('bad_request');
  }
};
