import { celebrate, Joi } from 'celebrate';

import isURL from 'validator/lib/isURL.js';

export default () => {
  // проверка почты
  const checkEmail = (email) => String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

  // проверка аватара
  const checkImgURL = (url) => String(url)
    .toLowerCase()
    .match(
      /^https?:\/\/.+\/.+$/,
    );

  const loginUser = celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4),
    }),
  });

  const createUser = celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(isURL, 'URL validation'),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4),
    }),
  });

  const createCard = celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(isURL, 'URL validation'),
    }),
  });

  const updateUserInfo = celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  });

  const updateUserAvatar = celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(isURL, 'URL validation'),
    }),
  });

  const checkId = celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24),
    }),
  });

  return {
    checkId,
    checkEmail,
    checkImgURL,
    loginUser,
    createUser,
    createCard,
    updateUserInfo,
    updateUserAvatar,
  };
};
