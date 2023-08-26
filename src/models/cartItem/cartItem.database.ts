import { PrismaClient } from '@prisma/client';

import { ICartItem, ICartItemFull } from '@/models/cartItem/cartItem.entity';

import { prisma } from '@/utils/prisma.util';

export class CartItemDatabase {
  private cartItemDb: PrismaClient['cartItem'];

  constructor() {
    this.cartItemDb = prisma.cartItem;
  }

  async createCartItem({
    cartId,
    productId,
    quantity,
  }: ICartItem): Promise<ICartItemFull> {
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
      throw console.error('CartItemDatabase.createCartItem', error);
    }
  }

  async updateCartItem({ id, quantity }: ICartItem): Promise<ICartItemFull> {
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
      throw console.error('CartItemDatabase.updateCartItem', error);
    }
  }
}
