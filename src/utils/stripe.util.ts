import config from 'config';
import Stripe from 'stripe';

const stripeSecretKey = config.get<string>('stripeSecretKey');

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2022-11-15',
  typescript: true,
});
