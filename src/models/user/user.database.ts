import { PrismaClient } from '@prisma/client';

import { IUser, IUserFull, IUserFullPayload } from '@/models/user/user.entity';

import { prisma } from '@/services/prisma.service';

export class UserDatabase {
  private userDb: PrismaClient['user'];

  constructor() {
    this.userDb = prisma.user;
  }

  // create user
  async createUser(data: IUser): Promise<IUserFullPayload> {
    try {
      const user = await this.userDb.create({
        data: {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          password: data.password,
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          firstname: true,
          lastname: true,
          email: true,
          password: true,
        },
      });
      return user;
    } catch (error) {
      throw console.error('UserDatabase.createUser', error);
    }
  }

  // read user by id
  async readUser(id: IUserFull['id']): Promise<IUserFullPayload> {
    try {
      const user = await this.userDb.findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          firstname: true,
          lastname: true,
          email: true,
          password: true,
        },
      });
      return user;
    } catch (error) {
      throw console.error('UserDatabase.readUser', error);
    }
  }
}
