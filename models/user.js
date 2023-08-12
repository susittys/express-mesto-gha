import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail.js';
import isURL from 'validator/lib/isURL.js';
import Error from '../common/errors.js';

const error = Error();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив-Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь Мирового океана',
  },
  avatar: {
    type: String,
    validate: isURL,
    default: 'https://i1.sndcdn.com/artworks-000056497777-92oyrv-t500x500.jpg',
  },
  email: {
    type: String,
    validate: isEmail,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw error.NotFound('Не найден пользователь с данным ID');

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) throw error.Unauthorized('Не верные почта или пароль');

          return user;
        });
    });
};

export default mongoose.model('user', userSchema);
