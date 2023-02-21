import { Request } from 'express';

interface AuthRequest extends Request {
  user: {
    login: string;
    password: string;
    _id: number;
  }
}

export default AuthRequest;
