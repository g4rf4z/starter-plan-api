export interface IProduct {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  url: string;
  description: string;
  price: number;
}

export type IProductReadById = Pick<IProduct, 'id'>;
