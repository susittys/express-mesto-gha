const mongoose = require('mongoose');
const express = require('express');

const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978asdf8bd833ca8133',
  };

  next();
});

app.use('/users', users);
app.use('/cards', cards);

app.listen(PORT);
