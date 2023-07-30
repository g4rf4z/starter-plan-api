import type { Prisma } from '@prisma/client';

import { prisma } from '../../utils/prisma.util';
import { handlePrismaError } from '../../utils/errors.util';

export const createCartItemService = async (
  data: Prisma.CartItemCreateArgs['data'],
  options: Omit<Prisma.CartItemCreateArgs, 'data'> = {}
) => {
  try {
    const createdCartItem = await prisma.cartItem.create({ data, ...options });

    return createdCartItem;
  } catch (error) {
    throw handlePrismaError(error, 'cartItem');
  }
};

export const findCartItemService = async (
  params: Prisma.CartItemFindFirstOrThrowArgs['where'],
  options: Omit<Prisma.CartItemFindFirstOrThrowArgs, 'where'> = {}
) => {
  try {
    const foundCartItem = await prisma.cartItem.findFirstOrThrow({
      where: params,
      ...options,
    });

    return foundCartItem;
  } catch (error) {
    throw handlePrismaError(error, 'cartItem');
  }
};

export const readCartItemService = async (
  params: Prisma.CartItemFindManyArgs['where'],
  options: Omit<Prisma.CartItemFindManyArgs, 'where'> = {}
) => {
  try {
    const foundCartItem = await prisma.cartItem.findMany({
      where: params,
      ...options,
    });

    return foundCartItem;
  } catch (error) {
    throw handlePrismaError(error, 'cartItem');
  }
};

export const deleteCartItemService = async (
  params: Prisma.CartItemDeleteArgs['where'],
  options: Omit<Prisma.CartItemDeleteArgs, 'where'> = {}
) => {
  try {
    const deleteCartItem = await prisma.cartItem.delete({
      where: params,
      ...options,
    });

    return deleteCartItem;
  } catch (error) {
    throw handlePrismaError(error, 'cartItem');
  }
};
