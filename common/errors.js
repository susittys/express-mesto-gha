module.exports.handleErrors = (errorName) => {
  console.log(errorName)
  const listErrors = {
    ValidationError: { code: 400, title: 'Переданы некорректные данные' },
    CastError: { code: 400, title: 'Некорректный ID' },
    notFound: { code: 400, title: 'Данные по указанному ID не найдены' },
    empty: { code: 400, title: 'Переданы некорректные данные' },
    notOwner: { code: 400, title: 'Нет прав для совершения действия' },
    default: { code: 500, title: 'Произошла ошибка' },
  };

  return listErrors[errorName]
    ? { code: listErrors[errorName].code, message: listErrors[errorName].title }
    : { code: listErrors.default.code, message: listErrors.default.title };
};

module.exports.sendErrorMessage = ({ res, code, message }) => res.status(code).send({ message });
