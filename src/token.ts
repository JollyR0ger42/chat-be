import jwt from 'jsonwebtoken';

function generate(target: object | string | Buffer): string {
  return jwt.sign(target, process.env.JWT_SECRET as string, { expiresIn: '7d' });
}

function verify(target: string): any {
  return jwt.verify(target, process.env.JWT_SECRET as string);
}

export default {
  generate,
  verify
};
