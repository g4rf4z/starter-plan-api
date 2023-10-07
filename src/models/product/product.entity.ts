export interface IProduct {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  url: string;
  description: string;
  price: number;
}

export type IProductFull = Required<IProduct>;

export class Product {
  id;
  createdAt;
  updatedAt;
  name;
  url;
  description;
  price;

  constructor(data: IProduct) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.name = data.name;
    this.url = data.url;
    this.description = data.description;
    this.price = data.price;
  }
}
