import cors from 'cors';
import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};

export default cors(corsOptions);
