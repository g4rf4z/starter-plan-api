import type { Prisma } from '@prisma/client';

import { prisma } from '../../utils/prisma.util';
import { handlePrismaError } from '../../utils/errors.util';

export const createUserService = async (
  data: Prisma.UserCreateArgs['data'],
  options: Omit<Prisma.UserCreateArgs, 'data'> = {}
) => {
  try {
    const createdUser = await prisma.user.create({ data, ...options });

    return createdUser;
  } catch (error) {
    throw handlePrismaError(error, 'product');
  }
};

export const findUserService = async (
  params: Prisma.UserFindUniqueOrThrowArgs['where'],
  options: Omit<Prisma.UserFindUniqueOrThrowArgs, 'where'> = {}
) => {
  try {
    const foundUser = await prisma.user.findUniqueOrThrow({
      where: params,
      ...options,
    });

    return foundUser;
  } catch (error) {
    throw handlePrismaError(error, 'product');
  }
};

export const findUsersService = async (
  params: Prisma.UserFindManyArgs['where'],
  options: Omit<Prisma.UserFindManyArgs, 'where'> = {}
) => {
  try {
    const foundUsers = await prisma.user.findMany({
      where: params,
      ...options,
    });

    return foundUsers;
  } catch (error) {
    throw handlePrismaError(error, 'product');
  }
};
