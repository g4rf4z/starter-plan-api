import { PrismaClient } from '@prisma/client';

import { prisma } from '@/services/prisma.service';
import { formatPrismaErrors } from '@/services/formatPrismaErrors.service';

import type {
  ICartItem,
  ICartItemCreate,
  ICartItemReadById,
  ICartItemReadAll,
  ICartItemUpdate,
  ICartItemDelete,
} from '@/models/cartItem/cartItem.entity';

export class CartItemDatabase {
  private cartItemDb: PrismaClient['cartItem'];

  constructor() {
    this.cartItemDb = prisma.cartItem;
  }

  async create(data: ICartItemCreate): Promise<ICartItem> {
    try {
      const cartItem = await this.cartItemDb.create({
        data: {
          quantity: data.quantity,
          cart: {
            connect: {
              id: data.cartId,
            },
          },
          product: {
            connect: {
              id: data.productId,
            },
          },
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          quantity: true,
          cartId: true,
          productId: true,
        },
      });
      return cartItem;
    } catch (error) {
      throw formatPrismaErrors('CartItemDatabase.create', error);
    }
  }

  async readById(data: ICartItemReadById): Promise<ICartItem> {
    try {
      const cartItem = await this.cartItemDb.findUniqueOrThrow({
        where: { id: data.id },
      });
      return cartItem;
    } catch (error) {
      throw formatPrismaErrors('CartItemDatabase.readById', error);
    }
  }

  async readAll(data: ICartItemReadAll): Promise<ICartItem[]> {
    try {
      const cartItems = await this.cartItemDb.findMany({
        where: { cartId: data.cartId },
      });
      return cartItems;
    } catch (error) {
      throw formatPrismaErrors('CartItemDatabase.readById', error);
    }
  }

  async update(data: ICartItemUpdate): Promise<ICartItem> {
    try {
      const cartItem = await this.cartItemDb.update({
        where: {
          id: data.id,
        },
        data: {
          quantity: data.quantity,
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          quantity: true,
          cartId: true,
          productId: true,
        },
      });
      return cartItem;
    } catch (error) {
      throw formatPrismaErrors('CartItemDatabase.update', error);
    }
  }

  async delete(data: ICartItemDelete): Promise<ICartItem> {
    try {
      const cartItem = await this.cartItemDb.delete({
        where: {
          id: data.id,
        },
      });
      return cartItem;
    } catch (error) {
      throw formatPrismaErrors('CartItemDatabase.delete', error);
    }
  }
}
