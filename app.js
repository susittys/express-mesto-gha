const mongoose = require('mongoose');
const express = require('express');

const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

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

app.use('/users', users);
app.use('/cards', cards);

app.get('*', (req, res) => res.status(404).send({ message: 'Обращение к несуществующему адресу :p' }));
app.post('*', (req, res) => res.status(404).send({ message: 'Обращение к несуществующему адресу :p' }));
app.patch('*', (req, res) => res.status(404).send({ message: 'Обращение к несуществующему адресу :p' }));
app.put('*', (req, res) => res.status(404).send({ message: 'Обращение к несуществующему адресу :p' }));
app.delete('*', (req, res) => res.status(404).send({ message: 'Обращение к несуществующему адресу :p' }));
