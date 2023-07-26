import type { Prisma } from '@prisma/client';

import { prisma } from '../utils/prisma.util';
import { handlePrismaError } from '../utils/errors.util';

export const createCartService = async (
  data: Prisma.CartCreateArgs['data'],
  options: Omit<Prisma.CartCreateArgs, 'data'> = {}
) => {
  try {
    const createdCart = await prisma.cart.create({ data, ...options });

    return createdCart;
  } catch (error) {
    throw handlePrismaError(error, 'cart');
  }
};

export const findCartService = async (
  params: Prisma.CartFindFirstOrThrowArgs['where'],
  options: Omit<Prisma.CartFindFirstOrThrowArgs, 'where'> = {}
) => {
  try {
    const foundCart = await prisma.cart.findFirstOrThrow({
      where: params,
      ...options,
    });

    return foundCart;
  } catch (error) {
    throw handlePrismaError(error, 'cart');
  }
};
