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
    _id: '5d8b8592978f8bd833ca8133',
  };

  next();
});

app.use('/users', users);
app.use('/cards', cards);

app.get('*', (req, res) => res.send({ message: 'Обращение к несуществующему адресу :p' }, 404));
app.post('*', (req, res) => res.send({ message: 'Обращение к несуществующему адресу :p' }, 404));
app.patch('*', (req, res) => res.send({ message: 'Обращение к несуществующему адресу :p' }, 404));
app.put('*', (req, res) => res.send({ message: 'Обращение к несуществующему адресу :p' }, 404));
app.delete('*', (req, res) => res.send({ message: 'Обращение к несуществующему адресу :p' }, 404));

app.listen(PORT);
