import { Request, Response } from 'express';

import { findPublishableKeyService } from '../services/publishableKey.service';

export const findPublishableKeyController = async (
  req: Request<{}, {}, {}>,
  res: Response
) => {
  try {
    const publishableKey = await findPublishableKeyService(
      process.env.STRIPE_PUBLISHABLE_KEY
    );

    if (!publishableKey) {
      return res.status(404).send('not_found');
    }

    return res.send({
      publishableKey,
    });
  } catch (error) {
    return res.status(500).send('internal_server_error');
  }
};
