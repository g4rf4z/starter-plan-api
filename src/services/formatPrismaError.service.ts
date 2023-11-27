import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import {
  ConflictError,
  NotFoundError,
  ApiError,
} from '@/models/apiError/apiError.entity';

export const formatPrismaError = (path: string, error: any) => {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        throw new ConflictError({
          path,
          type: 'DATABASE',
          details: String(error.meta?.target),
          raw: String(error),
        });

      case 'P2022':
        return new NotFoundError({
          path,
          type: 'DATABASE',
          details: String(error.meta?.target),
          raw: String(error),
        });

      default:
        return new ApiError({
          status: 500,
          type: 'DATABASE',
          message: error.message,
          path,
          details: error.code,
          raw: String(error),
        });
    }
  } else {
    return new ApiError({
      status: 500,
      type: 'DATABASE',
      message: error.message,
      path,
      details: error.code,
      raw: String(error),
    });
  }
};
