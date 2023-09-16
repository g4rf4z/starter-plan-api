import { Request, Response, NextFunction } from 'express';

import { AccessToken } from '@/services/token.service';
import { TokenService } from '@/services/token.service';

export const tokenDeserializer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken && !refreshToken) return next();

  try {
    const tokenService = new TokenService();
    const accessTokenData = tokenService.verify<AccessToken>(accessToken);
    res.locals.user = accessTokenData.user;
    res.locals.session = accessTokenData.session;
    return next();
  } catch (error) {
    //
  }

  try {
    const tokenService = new TokenService(true);
    const newAccessToken = await tokenService.reIssueAccessToken(refreshToken);

    res.cookie('accessToken', newAccessToken, {
      maxAge: 900000, // 15 minutes
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    const { user, session } = tokenService.verify<AccessToken>(newAccessToken);
    res.locals.user = user;
    res.locals.session = session;
  } catch {
    //
  }

  return next();
};
