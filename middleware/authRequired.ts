import { Response, NextFunction } from 'express';
import AuthRequest from './types/AuthRequest';
import Token from '../src/token';
import _c from '../controller/index';

const authRequired = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const target: string = req.cookies?.token;
  let user, iat: number;

  try {
    user = Token.verify(target);
    iat = user.iat;
    user = await _c.Users().getUser(user.login);
  }
  catch (e) {
    console.log(e);
    const err = new Error('Unauthorized');
    res.status(401);
    return next(err);
  }

  const createdAt = iat * 1000; // token has it in seconds
  let timePass: number = new Date().getTime() - createdAt;
  timePass = timePass / 1000 / 60 / 60; // in hours
  if (timePass >= 24) {
    const newToken = Token.generate({ login: user.login });
    res.append('Set-Cookie', `token=${newToken}; HttpOnly;`);
  }

  req.user = { ...user, password: '' };
  return next();
};

export default authRequired;
