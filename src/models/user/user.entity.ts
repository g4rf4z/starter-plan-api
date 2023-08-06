import { ICart } from '@/models/cart/cart.entity';

export interface IUser {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  firstname: string;
  lastname: string;
  email: string;
  cart?: ICart;
}

export type IUserFull = Required<IUser>;
export type IUserFullPayload = Omit<IUserFull, 'cart'>;

export class User {
  id;
  createdAt;
  updatedAt;
  firstname;
  lastname;
  email;
  cart;

  constructor(data: IUser) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.cart = data.cart;
  }
}
