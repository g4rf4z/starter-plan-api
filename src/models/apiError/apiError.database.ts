import type { PrismaClient } from '@prisma/client';

import { prisma } from '@/services/prisma.service';
import { formatPrismaErrors } from '@/services/formatPrismaErrors.service';

import type {
  IApiError,
  IApiErrorRead,
} from '@/models/apiError/apiError.entity';

export class ApiErrorDatabase {
  private apiErrorDb: PrismaClient['apiError'];

  constructor() {
    this.apiErrorDb = prisma.apiError;
  }

  async create(data: IApiError): Promise<Required<IApiErrorRead>> {
    try {
      const errorLog = await this.apiErrorDb.create({
        data,
      });
      return errorLog;
    } catch (error) {
      throw formatPrismaErrors('errorLogDatabase_create', error);
    }
  }
}
