import type { Prisma } from '@prisma/client';

import { prisma } from '../utils/prisma.util';
import { handlePrismaError } from '../utils/errors.util';

export const createProductService = async (
  data: Prisma.ProductCreateArgs['data'],
  options: Omit<Prisma.ProductCreateArgs, 'data'> = {}
) => {
  try {
    const createdProduct = await prisma.product.create({ data, ...options });

    return createdProduct;
  } catch (error) {
    throw handlePrismaError(error, 'product');
  }
};

export const findProductService = async (
  params: Prisma.ProductFindUniqueOrThrowArgs['where'],
  options: Omit<Prisma.ProductFindUniqueOrThrowArgs, 'where'> = {}
) => {
  try {
    const foundProduct = await prisma.product.findUniqueOrThrow({
      where: params,
      ...options,
    });

    return foundProduct;
  } catch (error) {
    throw handlePrismaError(error, 'product');
  }
};

export const findProductsService = async (
  params: Prisma.ProductFindManyArgs['where'],
  options: Omit<Prisma.ProductFindManyArgs, 'where'> = {}
) => {
  try {
    const foundProducts = await prisma.product.findMany({
      where: params,
      ...options,
    });

    return foundProducts;
  } catch (error) {
    throw handlePrismaError(error, 'product');
  }
};
