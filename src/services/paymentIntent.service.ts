import { stripe } from '../utils/stripe.util';

export const createPaymentIntentService = async (
  amount: number,
  currency: string,
  automatic_payment_methods: { enabled: boolean }
) => {
  try {
    const createdPaymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods,
    });

    return createdPaymentIntent;
  } catch (error) {
    throw error;
  }
};

export const findPaymentIntentsService = async (limit: number) => {
  try {
    const foundPaymentIntents = await stripe.paymentIntents.list({ limit });

    return foundPaymentIntents;
  } catch (error) {
    throw error;
  }
};
