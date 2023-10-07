import { PrismaClient } from '@prisma/client';

import { prisma } from '@/services/prisma.service';
import { formatPrismaErrors } from '@/services/formatPrismaErrors.service';

import {
  IResetPasswordToken,
  IResetPasswordTokenCreate,
  IResetPasswordTokenInvalidate,
  IResetPasswordTokenReadByUserId,
} from '@/models/resetPasswordToken/resetPasswordToken.entity';

export class ResetPasswordTokenDatabase {
  private resetPasswordTokenDb: PrismaClient['resetPasswordToken'];

  constructor() {
    this.resetPasswordTokenDb = prisma.resetPasswordToken;
  }

  async create(data: IResetPasswordTokenCreate): Promise<IResetPasswordToken> {
    try {
      const resetPasswordToken = await this.resetPasswordTokenDb.create({
        data,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          expiresAt: true,
          token: true,
          userId: true,
          isValid: true,
        },
      });
      return resetPasswordToken;
    } catch (error) {
      throw formatPrismaErrors('ResetPasswordTokenDatabase.create', error);
    }
  }

  async findValidTokenByUserId(
    data: IResetPasswordTokenReadByUserId
  ): Promise<IResetPasswordToken> {
    try {
      const foundToken = await this.resetPasswordTokenDb.findFirstOrThrow({
        where: {
          userId: data.userId,
          isValid: true,
          expiresAt: {
            gte: new Date(),
          },
        },
      });
      return foundToken;
    } catch (error) {
      throw formatPrismaErrors(
        'ResetPasswordTokenDatabase.findValidTokenByUserId',
        error
      );
    }
  }

  async invalidateToken(
    data: IResetPasswordTokenInvalidate
  ): Promise<IResetPasswordToken> {
    try {
      const updatedToken = await this.resetPasswordTokenDb.update({
        where: { id: data.id },
        data: { isValid: false },
      });
      return updatedToken;
    } catch (error) {
      throw formatPrismaErrors(
        'ResetPasswordTokenDatabase.invalidateToken',
        error
      );
    }
  }

  async invalidateAllUserTokens(
    userId: IResetPasswordToken['userId']
  ): Promise<void> {
    try {
      await this.resetPasswordTokenDb.updateMany({
        where: { userId },
        data: { isValid: false },
      });
    } catch (error) {
      throw formatPrismaErrors(
        'ResetPasswordTokenDatabase.invalidateAllUserTokens',
        error
      );
    }
  }
}
