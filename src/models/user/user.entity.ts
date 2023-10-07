import { ICart } from '@/models/cart/cart.entity';
import { ISession } from '@/models/session/session.entity';

export interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  firstname: string;
  lastname: string;
  email: string;
  password: string;

  cart?: ICart;
  orders?: string[];
  sessions?: ISession[];
}

export type IUserCreate = Pick<
  IUser,
  'firstname' | 'lastname' | 'email' | 'password'
>;
export type IUserFull = Required<IUser>;
export type IUserReadByEmail = Pick<IUser, 'email'>;
export type IUserReadById = Pick<IUser, 'id'>;
export type IUserUpdate = Partial<Pick<IUser, 'email' | 'password'>>;
export type IUserWithoutPassword = Omit<IUser, 'password'>;
export type IUserFullWithoutPassword = Omit<IUserFull, 'password'>;
export type IUserFullWithoutSession = Omit<IUserFull, 'sessions'>;
export type IUserFullPayload = Omit<IUserFull, 'cart' | 'orders' | 'sessions'>;

export class User {
  id;
  createdAt;
  updatedAt;
  firstname;
  lastname;
  email;
  password;
  cart;
  orders;
  sessions;

  constructor(data: IUser) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.password = data.password;
    this.cart = data.cart;
    this.orders = data.orders;
    this.sessions = data.sessions;
  }
}
