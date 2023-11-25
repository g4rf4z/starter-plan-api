import { PrismaClient } from '@prisma/client';

import { formatPrismaErrors, prisma } from '@/services';

import type {
  ICart,
  ICartCreateByUserId,
  ICartReadByUserId,
  ICartWithoutCartItems,
} from '@/models/cart/cart.entity';

export class CartDatabase {
  private cartDb: PrismaClient['cart'];

  constructor() {
    this.cartDb = prisma.cart;
  }

  async create(data: ICartCreateByUserId): Promise<ICartWithoutCartItems> {
    try {
      const cart = await this.cartDb.create({
        data: {
          user: {
            connect: {
              id: data.userId,
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
      throw formatPrismaErrors('CartDatabase.create', error);
    }
  }

  async readByUserId(data: ICartReadByUserId): Promise<ICart> {
    try {
      const cart = await this.cartDb.findUniqueOrThrow({
        where: { userId: data.userId },
        include: { cartItems: true },
      });
      return cart;
    } catch (error) {
      throw formatPrismaErrors('CartDatabase.readByUserId', error);
    }
  }
}
