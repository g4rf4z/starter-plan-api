import { Request, Response } from 'express';

import {
  createPaymentIntentService,
  findPaymentIntentsService,
} from '../services/paymentIntent.service';

import { createPaymentIntentInput } from '../schemas/paymentIntent.schema';

export const createPaymentIntentController = async (
  req: Request<{}, {}, createPaymentIntentInput['body']>,
  res: Response
) => {
  try {
    const { amount, currency, enable_automatic_payment } = req.body;

    const createdPaymentIntent = await createPaymentIntentService(
      amount,
      currency,
      {
        enabled: enable_automatic_payment,
      }
    );

    return res.send({
      clientSecret: createdPaymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send('bad_request');
  }
};

export const findPaymentIntentsController = async (
  req: Request<{}, {}, {}>,
  res: Response
) => {
  try {
    const foundPaymentIntents = await findPaymentIntentsService(10);

    return res.send(foundPaymentIntents);
  } catch (error) {
    throw error;
  }
};
