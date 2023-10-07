import config from 'config';

import { Request, Response, NextFunction } from 'express';

export const readPublishableKeyController = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const publishableKey = config.get<string | undefined>(
      'stripePublishableKey'
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
