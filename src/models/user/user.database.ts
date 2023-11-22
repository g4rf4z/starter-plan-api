import { PrismaClient } from '@prisma/client';

import { formatPrismaErrors, prisma } from '@/services';

import type {
  IUser,
  IUserCreate,
  IUserReadById,
  IUserReadByEmail,
  IUserUpdate,
  IUserDelete,
  IUserWithoutPassword,
} from '@/models/user/user.entity';

export class UserDatabase {
  private userDb: PrismaClient['user'];

  constructor() {
    this.userDb = prisma.user;
  }

  async create(data: IUserCreate): Promise<IUserWithoutPassword> {
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
      throw formatPrismaErrors('UserDatabase.create', error);
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

  async delete(data: IUserDelete): Promise<IUserWithoutPassword> {
    try {
      const user = await this.userDb.delete({
        where: { id: data.id },
      });
      return user;
    } catch (error) {
      throw formatPrismaErrors('UserDatabase.delete', error);
    }
  }
}
