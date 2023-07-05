import { Request, Response } from 'express';

import {
  createPaymentIntentService,
  findPaymentIntentsService,
} from '../services/paymentIntent.service';

export const createPaymentIntentController = async (
  req: Request<
    {},
    {},
    {
      amount: number;
      currency: string;
      automatic_payment_methods: { enabled: true };
    }
  >,
  res: Response
) => {
  try {
    const { amount, currency, automatic_payment_methods } = req.body;

    const createdPaymentIntent = await createPaymentIntentService(
      amount,
      currency,
      automatic_payment_methods
    );

    return res.send({
      clientSecret: createdPaymentIntent.client_secret,
    });
  } catch (error) {
    throw error;
  }
};

export const findPaymentIntentsController = async (
  req: Request<{}, {}, {}>,
  res: Response
) => {
  try {
    const foundPaymentIntents = await findPaymentIntentsService(10);

    return res.send(foundPaymentIntents);

    // const clientSecrets = foundPaymentIntents.data.map(
    //   (paymentIntent) => paymentIntent.client_secret
    // );

    // return res.send(clientSecrets);
  } catch (error) {
    throw error;
  }
};
