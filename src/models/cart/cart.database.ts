import { PrismaClient } from '@prisma/client';

import { prisma } from '@/services/prisma.service';
import { formatPrismaErrors } from '@/services/formatPrismaErrors.service';

import type {
  ICart,
  ICartFull,
  ICartFullPayload,
  ICartReadById,
} from '@/models/cart/cart.entity';

export class CartDatabase {
  private cartDb: PrismaClient['cart'];

  constructor() {
    this.cartDb = prisma.cart;
  }

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
      throw formatPrismaErrors('CartDatabase.createCart', error);
    }
  }

  async readById(data: ICartReadById): Promise<ICart> {
    try {
      const cart = await this.cartDb.findUniqueOrThrow({
        where: { id: data.id },
      });
      return cart;
    } catch (error) {
      throw formatPrismaErrors('CartDatabase.readById', error);
    }
  }

  async readCart(userId: ICartFull['userId']): Promise<ICartFull> {
    try {
      const cart = await this.cartDb.findUniqueOrThrow({
        where: { userId: userId },
        include: { cartItems: true },
      });
      return cart;
    } catch (error) {
      throw formatPrismaErrors('CartDatabase.readCart', error);
    }
  }
}
