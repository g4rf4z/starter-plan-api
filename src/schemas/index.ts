/* Session */
import { loginSchema } from '@/schemas/session/login.schema';
import { resetPasswordSchema } from '@/schemas/session/resetPasswordToken.schema';
import { setNewPasswordSchema } from '@/schemas/session/setNewPassword.schema';

/* User */
import { createUserSchema } from '@/schemas/user/createUser.schema';
import { updateUserSchema } from '@/schemas/user/updateUser.schema';
import { updateUserPasswordSchema } from '@/schemas/user/updateUserPassword.schema';

export {
  /* Session */
  loginSchema,
  resetPasswordSchema,
  setNewPasswordSchema,

  /* User */
  createUserSchema,
  updateUserSchema,
  updateUserPasswordSchema,
};
