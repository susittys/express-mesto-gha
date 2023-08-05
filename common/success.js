const getCode = (successName = '') => {
  const listSuccess = {
    added: { code: 201 },
    default: { code: 200 },
  };

  return listSuccess[successName]
    ? listSuccess[successName].code
    : listSuccess.default.code;
};

const sendSuccessMessage = ({ res, data, successName = 'default' }) => {
  res.status(getCode(successName)).send(data);
};

export default sendSuccessMessage;
