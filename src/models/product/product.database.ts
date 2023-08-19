import { PrismaClient } from '@prisma/client';

import { IProductFull } from './product.entity';

import { prisma } from '@/utils/prisma.util';

export class ProductDatabase {
  private productDb: PrismaClient['product'];

  constructor() {
    this.productDb = prisma.product;
  }

  // read product by id
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
      throw console.error('ProductDatabase.product', error);
    }
  }
}
