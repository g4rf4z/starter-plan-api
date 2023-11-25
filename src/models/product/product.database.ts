import { PrismaClient } from '@prisma/client';

import { formatPrismaErrors, prisma } from '@/services';

import type {
  IProduct,
  IProductReadById,
} from '@/models/product/product.entity';

export class ProductDatabase {
  private productDb: PrismaClient['product'];

  constructor() {
    this.productDb = prisma.product;
  }

  async read(data: IProductReadById): Promise<IProduct> {
    try {
      const product = await this.productDb.findUniqueOrThrow({
        where: { id: data.id },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          name: true,
          description: true,
          url: false,
          price: true,
          stripeProductId: true,
          stripePriceId: true,
        },
      });
      return product;
    } catch (error) {
      throw formatPrismaErrors('ProductDatabase.read', error);
    }
  }

  async readAll(): Promise<IProduct[]> {
    try {
      const products = await this.productDb.findMany({
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          name: true,
          description: true,
          url: false,
          price: true,
          stripeProductId: true,
          stripePriceId: true,
        },
      });
      return products;
    } catch (error) {
      throw formatPrismaErrors('ProductDatabase.readAll', error);
    }
  }
}
