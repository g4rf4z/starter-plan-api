import { object, TypeOf } from 'zod';

export const deleteUserSchema = object({
  params: object({}).strict(),
});
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;
