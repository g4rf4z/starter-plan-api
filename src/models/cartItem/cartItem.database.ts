import { PrismaClient } from '@prisma/client';

import { prisma } from '@/services/prisma.service';
import { formatPrismaErrors } from '@/services/formatPrismaErrors.service';

import type {
  ICartItem,
  ICartItemUpdate,
  ICartItemDelete,
} from '@/models/cartItem/cartItem.entity';

export class CartItemDatabase {
  private cartItemDb: PrismaClient['cartItem'];

  constructor() {
    this.cartItemDb = prisma.cartItem;
  }

  async create({ cartId, productId, quantity }: ICartItem): Promise<ICartItem> {
    try {
      const cartItem = await this.cartItemDb.create({
        data: {
          cart: {
            connect: {
              id: cartId,
            },
          },
          product: {
            connect: {
              id: productId,
            },
          },
          quantity: quantity,
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          cartId: true,
          productId: true,
          quantity: true,
        },
      });
      return cartItem;
    } catch (error) {
      throw formatPrismaErrors('CartItemDatabase.create', error);
    }
  }

  async update({ id, quantity }: ICartItemUpdate): Promise<ICartItem> {
    try {
      const cartItem = await this.cartItemDb.update({
        where: {
          id: id,
        },
        data: {
          quantity: quantity,
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          cartId: true,
          productId: true,
          quantity: true,
        },
      });
      return cartItem;
    } catch (error) {
      throw formatPrismaErrors('CartItemDatabase.update', error);
    }
  }

  async delete({ id }: ICartItemDelete): Promise<ICartItem> {
    try {
      const cartItem = await this.cartItemDb.delete({
        where: {
          id: id,
        },
      });
      return cartItem;
    } catch (error) {
      throw formatPrismaErrors('CartItemDatabase.delete', error);
    }
  }
}
