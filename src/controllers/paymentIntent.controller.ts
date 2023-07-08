import { Request, Response } from 'express';

import { createPaymentIntentService } from '../services/paymentIntent.service';

import { createPaymentIntentInput } from '../schemas/paymentIntent.schema';

export const createPaymentIntentController = async (
  req: Request<{}, {}, createPaymentIntentInput['body']>,
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

// export const findPaymentIntentsController = async (
//   req: Request<{}, {}, {}>,
//   res: Response
// ) => {
//   try {
//     const foundPaymentIntents = await findPaymentIntentsService(10);

//     return res.send(foundPaymentIntents);
//   } catch (error) {
//     throw error;
//   }
// };
