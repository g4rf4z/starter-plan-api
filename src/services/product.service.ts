import type { Prisma } from '@prisma/client';

import { prisma } from '../utils/prisma.util';
import { handlePrismaError } from '../utils/errors.util';

export const createProductService = async (
  data: Prisma.ProductCreateArgs['data'],
  options: Omit<Prisma.ProductCreateArgs, 'data'> = {}
) => {
  try {
    const product = await prisma.product.create({ data, ...options });

    return product;
  } catch (error) {
    throw handlePrismaError(error, 'product');
  }
};
