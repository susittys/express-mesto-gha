import { isCelebrateError } from 'celebrate';

// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  const { message = 'На сервере произошла ошибка' } = err;
  let { statusCode = 500 } = err;
  if (isCelebrateError(err)) statusCode = 400;
  res.status(statusCode).send({ message });
};
