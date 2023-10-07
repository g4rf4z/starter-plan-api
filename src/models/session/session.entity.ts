import { IUser } from '@/models/user/user.entity';

export interface ISession {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  active: boolean;
  userAgent: string | null;

  userId: IUser['id'];
  user?: IUser;
}

export type ISessionCreate = Pick<ISession, 'active' | 'userAgent' | 'userId'>;
export type ISessionReadById = Pick<ISession, 'id'>;
export type ISessionRevokeAllExceptOne = Pick<ISession, 'id' | 'userId'>;
export type ISessionUpdate = Pick<ISession, 'id'> &
  Partial<Pick<ISession, 'active' | 'userAgent'>>;
