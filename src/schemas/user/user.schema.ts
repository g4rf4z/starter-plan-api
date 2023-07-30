import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    firstname: string(),
    lastname: string(),
    email: string().email(),
  }).strict(),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;

export const findUserSchema = object({
  params: object({
    id: string(),
  }).strict(),
});

export type FindUserInput = TypeOf<typeof findUserSchema>;

export const findUsersSchema = object({
  body: object({
    params: object({
      firstname: string().optional(),
      lastname: string(),
      email: string().email(),
    })
      .strict()
      .optional(),
  }).strict(),
});

export type FindUsersInput = TypeOf<typeof findUsersSchema>;

export const updateUserSchema = object({
  params: object({
    id: string(),
  }).strict(),
  body: object({
    firstname: string(),
    lastname: string(),
    email: string().email(),
  }).strict(),
});

export type UpdateUserInput = TypeOf<typeof updateUserSchema>;

export const deleteUserSchema = object({
  params: object({
    id: string(),
  }).strict(),
});

export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;