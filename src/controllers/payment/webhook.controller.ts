import { Request, Response, NextFunction } from 'express';

import { stripe } from '@/services/stripe.service';

export const webhookController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
