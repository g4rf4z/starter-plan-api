import { Request, Response, NextFunction } from 'express';

import { ProductDatabase } from '@/models/product/product.database';

import { ReadProductInput } from '@/schemas/product/readProduct.schema';

export const readProduct = async (
  req: Request<ReadProductInput['params'], {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const productDb = new ProductDatabase();

    const product = await productDb.readProduct(id);
    return res.status(200).json({ product });
  } catch (error) {
    return next(error);
  }
};
