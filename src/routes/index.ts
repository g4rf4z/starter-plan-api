import { cartRoutes } from '@/routes/cart.routes';
import { cartItemRoutes } from '@/routes/cartItem.routes';
import { paymentRoutes } from '@/routes/payment.routes';
import { productRoutes } from '@/routes/product.routes';
import { sessionRoutes } from '@/routes/session.routes';
import { userRoutes } from '@/routes/user.routes';
import { userProductRoutes } from '@/routes/userProduct.routes';

export const routes = [
  cartRoutes,
  cartItemRoutes,
  paymentRoutes,
  productRoutes,
  sessionRoutes,
  userRoutes,
  userProductRoutes,
];
