import { PrismaClient } from '@prisma/client';

import { prisma } from '@/services/prisma.service';
import { formatPrismaErrors } from '@/services/formatPrismaErrors.service';

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
          url: true,
          description: true,
          price: true,
        },
      });
      return product;
    } catch (error) {
      throw formatPrismaErrors('ProductDatabase.readProduct', error);
    }
  }
}
