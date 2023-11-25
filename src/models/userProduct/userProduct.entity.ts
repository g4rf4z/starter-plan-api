import { IUser } from '@/models/user/user.entity';
import { IProduct } from '@/models/product/product.entity';

export interface IUserProduct {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: IUser['id'];
  productId: IProduct['id'];
}

export type IUserProductCreate = Pick<IUserProduct, 'userId' | 'productId'>;
export type IUserProductReadById = Pick<IUserProduct, 'id'>;
export type IUserProductReadAllByUserId = Pick<IUserProduct, 'userId'>;
