import config from 'config';
import Stripe from 'stripe';

const stripeSecretKey = config.get<string>('stripeSecretKey');

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
  typescript: true,
});
