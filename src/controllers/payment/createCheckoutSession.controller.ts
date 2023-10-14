import { Request, Response, NextFunction } from 'express';

import { stripe } from '@/services/stripe.service';

import { IUser } from '@/models/user/user.entity';

import { createCheckoutSessionInput } from '@/schemas/payment/createCheckoutSession.schema';

export const createCheckoutSessionController = async (
  req: Request<{}, {}, createCheckoutSessionInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id as IUser['id'];
    const { line_items } = req.body;

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      automatic_tax: {
        enabled: true,
      },
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    return res.send(checkoutSession.url);
  } catch (error) {
    return next(error);
  }
};
