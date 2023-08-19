import { ICartFull } from '@/models/cart/cart.entity';
import { IProductFull } from '@/models/product/product.entity';

export interface ICartItem {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  cartId: ICartFull['id'];
  productId: IProductFull['id'];
  quantity: number;
}

export type ICartItemFull = Required<ICartItem>;
export type ICartItemFullPayload = Omit<ICartItemFull, 'productId'>;

export class CartItem {
  id;
  createdAt;
  updatedAt;
  cartId;
  productId;
  quantity;

  constructor(data: ICartItem) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.cartId = data.cartId;
    this.productId = data.productId;
    this.quantity = data.quantity;
  }
}