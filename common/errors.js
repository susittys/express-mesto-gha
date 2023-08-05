const getCode = (errorName) => {
  const listErrors = {
    ValidationError: { code: 400, title: 'Переданы некорректные данные' },
    CastError: { code: 400, title: 'Некорректный ID' },
    notFound: { code: 404, title: 'Обращение к несуществующему адресу' },
    empty: { code: 400, title: 'Переданы некорректные данные' },
    notOwner: { code: 400, title: 'Нет прав для совершения действия' },
    default: { code: 500, title: 'Произошла ошибка' },
  };

  return listErrors[errorName]
    ? { code: listErrors[errorName].code, message: listErrors[errorName].title }
    : { code: listErrors.default.code, message: listErrors.default.title };
};

const sendErrorMessage = ({ res, errorName }) => {
  // console.log(errorName)
  const { code, message } = getCode(errorName);

  res.status(code).send({ message });
};

export default sendErrorMessage;
