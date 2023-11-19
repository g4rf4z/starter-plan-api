// import { Request, Response, NextFunction } from 'express';

// import { IUser } from '@/models/user/user.entity';

// import { ProductDatabase } from '@/models/product/product.database';
// import { UserProductDatabase } from '@/models/userProduct/userProduct.database';

// export const createUserProductController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const userId = res.locals.user.id as IUser['id'];

//     const productDb = new ProductDatabase();
//     const userProductDb = new UserProductDatabase();

//     const userProduct = await userProductDb.create({
//       userId,
//       productId,
//     });
//     return res.status(201).json({ userProduct });
//   } catch (error) {
//     return next(error);
//   }
// };
