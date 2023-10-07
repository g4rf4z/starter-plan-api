import { PrismaClient } from '@prisma/client';

import { prisma } from '@/services/prisma.service';
import { formatPrismaErrors } from '@/services/formatPrismaErrors.service';

import type { IProductFull } from '@/models/product/product.entity';

export class ProductDatabase {
  private productDb: PrismaClient['product'];

  constructor() {
    this.productDb = prisma.product;
  }

  async readProduct(id: IProductFull['id']): Promise<IProductFull> {
    try {
      const product = await this.productDb.findUniqueOrThrow({
        where: { id },
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
