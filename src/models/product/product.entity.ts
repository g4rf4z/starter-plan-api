export interface IProduct {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  url?: string;
  price: number;
  stripeProductId: string;
  stripePriceId: string;
}

export type IProductReadById = Pick<IProduct, 'id'>;
