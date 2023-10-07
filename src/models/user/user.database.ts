import { PrismaClient } from '@prisma/client';

import { prisma } from '@/services/prisma.service';
import { formatPrismaErrors } from '@/services/formatPrismaErrors.service';

import type {
  IUser,
  IUserCreate,
  IUserFull,
  IUserFullPayload,
  IUserReadByEmail,
  IUserReadById,
  IUserUpdate,
  IUserWithoutPassword,
} from '@/models/user/user.entity';

export class UserDatabase {
  private userDb: PrismaClient['user'];

  constructor() {
    this.userDb = prisma.user;
  }

  async createUser(data: IUserCreate): Promise<IUserWithoutPassword> {
    try {
      const user = await this.userDb.create({
        data,
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
      throw formatPrismaErrors('UserDatabase.createUser', error);
    }
  }

  async readByEmail(data: IUserReadByEmail): Promise<IUser> {
    try {
      const user = await this.userDb.findUniqueOrThrow({
        where: { email: data.email },
      });
      return user;
    } catch (error) {
      throw formatPrismaErrors('UserDatabase.readByEmail', error);
    }
  }

  async readById(data: IUserReadById): Promise<IUser> {
    try {
      const user = await this.userDb.findUniqueOrThrow({
        where: { id: data.id },
      });
      return user;
    } catch (error) {
      throw formatPrismaErrors('UserDatabase.readById', error);
    }
  }

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
      throw formatPrismaErrors('UserDatabase.readUser', error);
    }
  }

  async update(
    id: IUser['id'],
    data: IUserUpdate
  ): Promise<IUserWithoutPassword> {
    try {
      const user = await this.userDb.update({
        where: { id },
        data,
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
      throw formatPrismaErrors('UserDatabase.update', error);
    }
  }
}
