import config from 'config';

export const findPublishableKeyService = (): string | undefined => {
  const publishableKey = config.get<string>('stripePublishableKey');
  return publishableKey;
};
