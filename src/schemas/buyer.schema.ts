import { object, string, TypeOf } from 'zod';

export const createBuyerSchema = object({
  params: object({}).optional(),
  query: object({}).optional(),
  body: object({
    firstname: string(),
    lastname: string(),
    email: string().email(),
  }).strict(),
}).strict();

export type CreateBuyerInput = TypeOf<typeof createBuyerSchema>;

export const findBuyerSchema = object({
  params: object({
    id: string(),
  }).strict(),
});

export type FindBuyerInput = TypeOf<typeof findBuyerSchema>;

export const findBuyersSchema = object({
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

export type FindBuyersInput = TypeOf<typeof findBuyersSchema>;
