import axios from 'axios';

export const formatPhoneNumber = (phoneNumber) => {
  return (
    '+1' +
    phoneNumber.slice(4, 7) +
    phoneNumber.slice(9, 12) +
    phoneNumber.slice(13)
  );
};

export const validateNumber = (phoneNumber) => {
  const regEx = /^\+[1-9]\d{10,14}$/;
  return regEx.test(phoneNumber);
};

export const postNumber = async (phoneNumber, zipCode, borough) => {
  const requestBody = {
    phoneNumber,
    borough,
    zipCode,
  };
  const { data } = await axios.post(
    'https://3rz7qei4xj.execute-api.us-east-1.amazonaws.com/Prod/phoneNumber/',
    requestBody
  );
  return data;
};

export const deleteNumber = async (phoneNumber) => {
  const requestBody = {
    phoneNumber,
  };
  const {
    data,
  } = await axios.delete(
    'https://3rz7qei4xj.execute-api.us-east-1.amazonaws.com/Prod/phoneNumber/',
    { data: requestBody }
  );
  return data;
};
