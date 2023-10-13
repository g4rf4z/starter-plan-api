import { Request, Response, NextFunction } from 'express';

import { stripe } from '@/services/stripe.service';

export const createCheckoutSessionController = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2500,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    if (checkoutSession.url) {
      return res.redirect(303, checkoutSession.url);
    } else {
      return res
        .status(500)
        .send("La session n'a pas d'URL de redirection valide.");
    }
  } catch (error) {
    return next(error);
  }
};
