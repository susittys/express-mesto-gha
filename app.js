import mongoose from 'mongoose';
import express from 'express';
import rootRouter from './routes/index.js';

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

app.listen(PORT);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };

  next();
});

app.use('/', rootRouter);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Обращение к несуществующему адресу :p' });
});
