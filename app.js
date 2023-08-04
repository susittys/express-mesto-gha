const mongoose = require('mongoose');
const express = require('express');

const bodyParser = require('body-parser');
const tempID = require('./middlewares/tempID');
const users = require('./routes/users');
const cards = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('Подключение к БД успешно'))
  .catch((err) => console.error(`Ошибка при подключении к БД ${err.message}`));

app.use(tempID);
app.use('/users', users);
app.use('/cards', cards);

app.listen(PORT);
