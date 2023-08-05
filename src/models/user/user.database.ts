import { PrismaClient } from '@prisma/client';

import { IUserFull, IUser } from './user.entity';

import { prisma } from '../../utils/prisma.util';

export class UserDatabase {
  private userDb: PrismaClient['user'];

  constructor() {
    this.userDb = prisma.user;
  }

  async create(data: IUser): Promise<IUserFull> {
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
      throw console.error('UserDatabase.create', error);
    }
  }

  //   async readByEmail(
  //     email: IUserFull['email']
  //   ): Promise<IUserFullWithoutSessions> {
  //     try {
  //       const user = await this.userDb.findUniqueOrThrow({
  //         where: { email },
  //         select: {
  //           id: true,
  //           createdAt: true,
  //           updatedAt: true,
  //           firstname: true,
  //           lastname: true,
  //           nickname: true,
  //           email: true,
  //           password: true,
  //         },
  //       });
  //       return user;
  //     } catch (error) {
  //       throw formatPrismaErrors('UserDatabase.readByEmail', error);
  //     }
  //   }

  //   async readById(id: IUserFull['id']): Promise<IUserFullWithoutSessions> {
  //     try {
  //       const user = await this.userDb.findUniqueOrThrow({
  //         where: { id },
  //         select: {
  //           id: true,
  //           createdAt: true,
  //           updatedAt: true,
  //           firstname: true,
  //           lastname: true,
  //           nickname: true,
  //           email: true,
  //           password: true,
  //         },
  //       });
  //       return user;
  //     } catch (error) {
  //       throw formatPrismaErrors('UserDatabase.readById', error);
  //     }
  //   }

  //   async update(
  //     id: IUserFull['id'],
  //     data: Partial<User>
  //   ): Promise<IUserFullPayload> {
  //     try {
  //       const user = await this.userDb.update({
  //         where: { id },
  //         data,
  //         select: {
  //           id: true,
  //           createdAt: true,
  //           updatedAt: true,
  //           firstname: true,
  //           lastname: true,
  //           nickname: true,
  //           email: true,
  //         },
  //       });
  //       return user;
  //     } catch (error) {
  //       throw formatPrismaErrors('UserDatabase.update', error);
  //     }
  //   }
}
