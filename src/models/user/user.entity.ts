import { ICart } from '@/models/cart/cart.entity';
import { ISession } from '@/models/session/session.entity';

export interface IUser {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
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
export type IUserReadById = Pick<IUser, 'id'>;
export type IUserReadByEmail = Pick<IUser, 'email'>;
export type IUserUpdate = Partial<
  Pick<IUser, 'firstname' | 'lastname' | 'email' | 'password'>
>;
export type IUserDelete = Pick<IUser, 'id'>;
export type IUserWithoutPassword = Omit<IUser, 'password'>;
