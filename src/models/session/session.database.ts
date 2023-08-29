import { PrismaClient } from '@prisma/client';

import { formatPrismaErrors } from '@/services/formatPrismaErrors.service';
import { prisma } from '@/services/prisma.service';

import {
  ISession,
  ISessionCreate,
  ISessionReadById,
  ISessionRevokeAllExceptOne,
  ISessionUpdate,
} from '@/models/session/session.entity';

export class SessionDatabase {
  private sessionDb: PrismaClient['session'];

  constructor() {
    this.sessionDb = prisma.session;
  }

  async create(data: ISessionCreate): Promise<ISession> {
    try {
      const session = await this.sessionDb.create({
        data: {
          active: data.active,
          userAgent: data.userAgent,
          user: {
            connect: {
              id: data.userId,
            },
          },
        },
      });
      return session;
    } catch (error) {
      throw formatPrismaErrors('SessionDatabase.create', error);
    }
  }

  async readById(data: ISessionReadById): Promise<ISession> {
    try {
      const session = await this.sessionDb.findUniqueOrThrow({
        where: { id: data.id },
      });
      return session;
    } catch (error) {
      throw formatPrismaErrors('SessionDatabase.readById', error);
    }
  }

  async revokeAllExceptOne(data: ISessionRevokeAllExceptOne): Promise<void> {
    try {
      await this.sessionDb.updateMany({
        where: {
          userId: data.userId,
          active: true,
          NOT: {
            id: data.id,
          },
        },
        data: {
          active: false,
        },
      });
      return;
    } catch (error) {
      throw formatPrismaErrors('SessionDatabase.revokeAllExceptOne', error);
    }
  }

  async update(data: ISessionUpdate): Promise<ISession> {
    try {
      const session = await this.sessionDb.update({
        where: { id: data.id },
        data: {
          active: data.active,
          userAgent: data.userAgent,
        },
      });
      return session;
    } catch (error) {
      throw formatPrismaErrors('SessionDatabase.update', error);
    }
  }
}
