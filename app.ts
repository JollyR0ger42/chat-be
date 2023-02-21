console.log('YO!!!')
import dotenv from 'dotenv';
import express from 'express';
import { Application } from 'express';
import appConfig from './app.config';

dotenv.config();
const port: number = parseInt(process.env.PORT || '3000');

const app: Application = express();
app.use(express.json());
appConfig(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
