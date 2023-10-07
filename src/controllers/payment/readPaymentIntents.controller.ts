import { Request, Response, NextFunction } from 'express';

import { readPaymentIntentsService } from '@/services/payment/readPaymentIntents.service';

export const readPaymentIntentsController = async (
  req: Request<{}, {}, {}>,
  res: Response
) => {
  try {
    const paymentIntents = await readPaymentIntentsService(10);

    return res.send(paymentIntents);
  } catch (error) {
    throw error;
  }
};
