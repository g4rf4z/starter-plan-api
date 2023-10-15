import { ICart } from '@/models/cart/cart.entity';
import { IProduct } from '@/models/product/product.entity';

export interface ICartItem {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  quantity: number;
  cartId: ICart['id'];
  productId: IProduct['id'];
}

export type ICartItemCreate = Pick<
  ICartItem,
  'quantity' | 'cartId' | 'productId'
>;
export type ICartItemReadById = Pick<ICartItem, 'id'>;
export type ICartItemUpdate = Pick<ICartItem, 'id' | 'quantity'>;
export type ICartItemDelete = Pick<ICartItem, 'id'>;
