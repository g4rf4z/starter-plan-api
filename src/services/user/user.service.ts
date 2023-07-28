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
    throw handlePrismaError(error, 'user');
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
    throw handlePrismaError(error, 'user');
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
    throw handlePrismaError(error, 'user');
  }
};

export const updateUserService = async (
  params: Prisma.UserUpdateArgs['where'],
  data: Prisma.UserUpdateArgs['data'],
  options: Omit<Prisma.UserUpdateArgs, 'where' | 'data'> = {}
) => {
  try {
    const updatedUser = await prisma.user.update({
      where: params,
      data,
      ...options,
    });

    return updatedUser;
  } catch (error) {
    throw handlePrismaError(error, 'user');
  }
};

export const deleteUserService = async (
  params: Prisma.UserDeleteArgs['where'],
  options: Omit<Prisma.UserDeleteArgs, 'where'> = {}
) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: params,
      ...options,
    });

    return deletedUser;
  } catch (error) {
    throw handlePrismaError(error, 'user');
  }
};
