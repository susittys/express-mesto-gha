import { config } from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import express from 'express';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import rootRouter from './routes/index.js';
import handlerError from './middlewares/handlerError.js';

config();
const { DEV_PORT } = process.env;

const app = express();

app.listen(DEV_PORT);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(helmet());

app.use(express.json());

app.use(cookieParser());

app.use('/', rootRouter);

app.use(errors());

app.use(handlerError);
