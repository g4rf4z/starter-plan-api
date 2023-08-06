import { PrismaClient } from '@prisma/client';

import { ICart, ICartFullPayload } from '@/models/cart/cart.entity';

import { prisma } from '@/utils/prisma.util';

export class CartDatabase {
  private cartDb: PrismaClient['cart'];

  constructor() {
    this.cartDb = prisma.cart;
  }

  async create({ userId }: ICart): Promise<ICartFullPayload> {
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
      throw console.error('CartDatabase.create', error);
    }
  }
}
