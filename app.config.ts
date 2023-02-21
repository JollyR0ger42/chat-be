import { Application } from 'express';
import cookieParser from 'cookie-parser';
import cors from './middleware/cors';
import routes from './src/routes';

export default function configureApp(app: Application): void {
  app.use(cors);
  app.use(cookieParser());
  routes(app);
}
