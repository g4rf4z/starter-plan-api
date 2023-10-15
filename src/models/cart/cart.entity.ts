import { IUser } from '@/models/user/user.entity';
import { ICartItem } from '@/models/cartItem/cartItem.entity';

export interface ICart {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId: IUser['id'];
  cartItems?: ICartItem[];
}

export type ICartCreateByUserId = Pick<ICart, 'userId'>;
export type ICartReadByUserId = Pick<ICart, 'userId'>;
export type ICartWithoutCartItems = Omit<ICart, 'cartItems'>;
