import type { Prisma } from '@prisma/client';

import { prisma } from '../utils/prisma.util';
import { handlePrismaError } from '../utils/errors.util';

export const createBuyerService = async (
  data: Prisma.BuyerCreateArgs['data'],
  options: Omit<Prisma.BuyerCreateArgs, 'data'> = {}
) => {
  try {
    const createdBuyer = await prisma.buyer.create({ data, ...options });

    return createdBuyer;
  } catch (error) {
    throw handlePrismaError(error, 'product');
  }
};

export const findBuyerService = async (
  params: Prisma.BuyerFindUniqueOrThrowArgs['where'],
  options: Omit<Prisma.BuyerFindUniqueOrThrowArgs, 'where'> = {}
) => {
  try {
    const foundBuyer = await prisma.buyer.findUniqueOrThrow({
      where: params,
      ...options,
    });
    console.log(foundBuyer);
    return foundBuyer;
  } catch (error) {
    throw handlePrismaError(error, 'product');
  }
};

export const findBuyersService = async (
  params: Prisma.BuyerFindManyArgs['where'],
  options: Omit<Prisma.BuyerFindManyArgs, 'where'> = {}
) => {
  try {
    const foundBuyers = await prisma.buyer.findMany({
      where: params,
      ...options,
    });

    return foundBuyers;
  } catch (error) {
    throw handlePrismaError(error, 'product');
  }
};
