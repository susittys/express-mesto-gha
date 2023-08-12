import { config } from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import express from 'express';
import cookieParser from 'cookie-parser';
import rootRouter from './routes/index.js';
import { login, createUser } from './controllers/users.js';
import Validator from './common/validator.js';
import users from './routes/users.js';
import cards from './routes/cards.js';
import auth from './middlewares/auth.js';
import handlerError from './middlewares/handlerError.js';
import Errors from './common/errors.js';

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

const validator = Validator();
app.post('/signup', validator.createUser, createUser);
app.post('/signin', validator.loginUser, login);

app.use('/cards', auth, cards);
app.use('/users', auth, users);

app.use('/', rootRouter);

const errors = Errors();
app.all('*', (err, req, res, next) => (err
  ? next(errors.NotFound('Ресурс по вашему запросу не найден'))
  : next()));

app.use(handlerError);
