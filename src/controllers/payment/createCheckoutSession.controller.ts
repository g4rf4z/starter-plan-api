import { Request, Response, NextFunction } from 'express';

import { stripe } from '@/services/stripe.service';

import { createCheckoutSessionInput } from '@/schemas/payment/createCheckoutSession.schema';

export const createCheckoutSessionController = async (
  req: Request<{}, {}, createCheckoutSessionInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currency, productName, unitAmount, quantity } = req.body;

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: productName,
            },
            unit_amount: unitAmount,
          },
          quantity: quantity,
        },
      ],
      automatic_tax: {
        enabled: true,
      },
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    if (checkoutSession.url) {
      return res.send(303, checkoutSession.url);
    } else {
      return res
        .status(500)
        .send("La session n'a pas d'URL de redirection valide.");
    }
  } catch (error) {
    return next(error);
  }
};
