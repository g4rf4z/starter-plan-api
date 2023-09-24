import { IUser } from '@/models/user/user.entity';

export interface IResetPasswordToken {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  isValid: boolean;
  token: string;
  userId: IUser['id'];
}

export type IResetPasswordTokenCreate = Pick<
  IResetPasswordToken,
  'expiresAt' | 'token' | 'userId' | 'isValid'
>;
export type IResetPasswordTokenReadByUserId = Pick<
  IResetPasswordToken,
  'userId'
>;
export type IResetPasswordTokenInvalidate = Pick<IResetPasswordToken, 'id'>;
