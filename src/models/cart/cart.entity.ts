import { IUserFull } from '@/models/user/user.entity';
import { ICartItem } from '@/models/cartItem/cartItem.entity';

export interface ICart {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId: IUserFull['id'];
  cartItems?: ICartItem[];
}

export type ICartFull = Required<ICart>;
export type ICartReadById = Pick<ICart, 'id'>;
export type ICartFullPayload = Omit<ICartFull, 'cartItems'>;

export class Cart {
  id;
  createdAt;
  updatedAt;
  userId;
  cartItems;

  constructor(data: ICart) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.userId = data.userId;
    this.cartItems = data.cartItems;
  }
}
