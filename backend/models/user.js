const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized-err');

function validateEmail(input) {
  return validator.isEmail(input);
}

function validateURL(input) {
  return validator.isURL(input);
}

function validateStrongPassword(input) {
  return validator.isStrongPassword(input);
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },

  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },

  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: validateURL,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: validateEmail,
  },

  password: {
    type: String,
    required: true,
    select: false,
    validate: validateStrongPassword,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта и/или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matches) => {
          if (!matches) {
            return Promise.reject(new UnauthorizedError('Неправильные почта и/или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
