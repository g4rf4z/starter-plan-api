/* Cart Item */
import { createCartItemSchema } from '@/schemas/cartItem/createCartItem.schema';
import { readCartItemSchema } from '@/schemas/cartItem/readCartItem.schema';
import { updateCartItemSchema } from '@/schemas/cartItem/updateCartItem.schema';
import { deleteCartItemSchema } from '@/schemas/cartItem/deleteCartItem.schema';

/* Payment */
import { createCheckoutSessionSchema } from '@/schemas/payment/createCheckoutSession.schema';

/* Product */
import { createProductSchema } from '@/schemas/product/createProduct.schema';
import { readProductSchema } from '@/schemas/product/readProduct.schema';

/* Session */
import { loginSchema } from '@/schemas/session/login.schema';
import { resetPasswordSchema } from '@/schemas/session/resetPasswordToken.schema';
import { setNewPasswordSchema } from '@/schemas/session/setNewPassword.schema';

/* User */
import { createUserSchema } from '@/schemas/user/createUser.schema';
import { updateUserSchema } from '@/schemas/user/updateUser.schema';
import { updateUserPasswordSchema } from '@/schemas/user/updateUserPassword.schema';

export {
  /* Cart Item */
  createCartItemSchema,
  readCartItemSchema,
  updateCartItemSchema,
  deleteCartItemSchema,

  /* Payment */
  createCheckoutSessionSchema,

  /* Product */
  createProductSchema,
  readProductSchema,

  /* Session */
  loginSchema,
  resetPasswordSchema,
  setNewPasswordSchema,

  /* User */
  createUserSchema,
  updateUserSchema,
  updateUserPasswordSchema,
};
