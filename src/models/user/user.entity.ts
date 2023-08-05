export interface IUser {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  firstname: string;
  lastname: string;
  email: string;
}

export type IUserFull = Required<IUser>;

export class User {
  id;
  createdAt;
  updatedAt;
  firstname;
  lastname;
  email;

  constructor(data: IUser) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
  }
}
