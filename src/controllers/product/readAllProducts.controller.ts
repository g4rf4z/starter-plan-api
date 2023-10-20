import { Request, Response, NextFunction } from 'express';

import { ProductDatabase } from '@/models/product/product.database';

export const readAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productDb = new ProductDatabase();

    const products = await productDb.readAll();
    return res.status(200).json({ products });
  } catch (error) {
    return next(error);
  }
};
