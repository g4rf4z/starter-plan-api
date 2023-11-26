import type { PrismaClient } from '@prisma/client';

import { prisma, formatPrismaError } from '@/services';

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
      const apiError = await this.apiErrorDb.create({
        data,
      });
      return apiError;
    } catch (error) {
      throw formatPrismaError('apiErrorDatabase.create', error);
    }
  }
}
