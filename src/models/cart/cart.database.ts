import { PrismaClient } from '@prisma/client';

import { ICart, ICartFull, ICartFullPayload } from '@/models/cart/cart.entity';

import { prisma } from '@/utils/prisma.util';

export class CartDatabase {
  private cartDb: PrismaClient['cart'];

  constructor() {
    this.cartDb = prisma.cart;
  }

  // create cart
  async createCart({ userId }: ICart): Promise<ICartFullPayload> {
    try {
      const cart = await this.cartDb.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
        },
      });
      return cart;
    } catch (error) {
      throw console.error('CartDatabase.createCart', error);
    }
  }

  // read cart by user's id
  async readCart(userId: ICartFull['userId']): Promise<ICartFull> {
    try {
      const cart = await this.cartDb.findUniqueOrThrow({
        where: { userId: userId },
        include: { cartItems: true },
      });
      return cart;
    } catch (error) {
      throw console.error('CartDatabase.readCart', error);
    }
  }
}
