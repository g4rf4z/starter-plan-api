import config from 'config';
import Stripe from 'stripe';

const stripeSecretKey = config.get<string>('stripeSecretKey');

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-09-30.acacia',
  typescript: true,
});
