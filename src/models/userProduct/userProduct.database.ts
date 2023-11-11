import { PrismaClient } from '@prisma/client';

import { prisma } from '@/services/prisma.service';
import { formatPrismaErrors } from '@/services/formatPrismaErrors.service';

import type {
  IUserProduct,
  IUserProductCreate,
  IUserProductReadById,
} from '@/models/userProduct/userProduct.entity';

export class UserProductDatabase {
  private userProductDb: PrismaClient['userProduct'];

  constructor() {
    this.userProductDb = prisma.userProduct;
  }

  async create(data: IUserProductCreate): Promise<IUserProduct> {
    try {
      const userProduct = await this.userProductDb.create({
        data: {
          user: {
            connect: {
              id: data.userId,
            },
          },
          product: {
            connect: {
              id: data.productId,
            },
          },
        },
      });
      return userProduct;
    } catch (error) {
      throw formatPrismaErrors('UserProductDatabase.create', error);
    }
  }

  async read(data: IUserProductReadById): Promise<IUserProduct> {
    try {
      const userProduct = await this.userProductDb.findUniqueOrThrow({
        where: { id: data.id },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
          productId: true,
        },
      });
      return userProduct;
    } catch (error) {
      throw formatPrismaErrors('UserProductDatabase.read', error);
    }
  }

  async readAll(): Promise<IUserProduct[]> {
    try {
      const userProducts = await this.userProductDb.findMany({
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
          productId: true,
        },
      });
      return userProducts;
    } catch (error) {
      throw formatPrismaErrors('UserProductDatabase.readAll', error);
    }
  }
}
