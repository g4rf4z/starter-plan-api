import type { Prisma } from '@prisma/client';

import { prisma } from '../utils/prisma.util';
import { handlePrismaError } from '../utils/errors.util';

export const createCartService = async (
  data: Prisma.CartCreateArgs['data'],
  options: Omit<Prisma.CartCreateArgs, 'data'> = {}
) => {
  try {
    const createdCart = await prisma.cart.create({
      data: {
        user: {
          connect: { id: data.userId },
        },
      },
      ...options,
    });

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
    return await prisma.cart.findFirstOrThrow({ where: params, ...options });
  } catch (error) {
    throw handlePrismaError(error, 'cart');
  }
};
