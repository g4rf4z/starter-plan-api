import { object, array, string, number, boolean, TypeOf } from 'zod';

export const createCheckoutSessionSchema = object({
  body: object({
    client_reference_id: string(),
    line_items: array(
      object({
        price: string(),
        quantity: number().min(1),
      })
    ),
    billing_address_collection: string(),
    mode: string(),
    automatic_tax: object({
      enabled: boolean(),
    }),
    metadata: object({
      purchased_product_ids: array(string()),
    }),
  }).strict(),
});
export type createCheckoutSessionInput = TypeOf<
  typeof createCheckoutSessionSchema
>;
