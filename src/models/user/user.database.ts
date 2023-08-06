import { PrismaClient } from '@prisma/client';

import { IUser, IUserFullPayload } from '@/models/user/user.entity';

import { prisma } from '@/utils/prisma.util';

export class UserDatabase {
  private userDb: PrismaClient['user'];

  constructor() {
    this.userDb = prisma.user;
  }

  async create(data: IUser): Promise<IUserFullPayload> {
    try {
      const user = await this.userDb.create({
        data: {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          firstname: true,
          lastname: true,
          email: true,
        },
      });
      return user;
    } catch (error) {
      throw console.error('UserDatabase.create', error);
    }
  }
}
