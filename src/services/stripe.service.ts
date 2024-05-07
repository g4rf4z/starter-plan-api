import config from 'config';
import Stripe from 'stripe';

const stripeSecretKey = config.get<string>('stripeSecretKey');

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-04-10',
  typescript: true,
});
