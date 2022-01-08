import axios from 'axios';

// const config1 = {
//   headers: {
//     'Access-Control-Allow-Origin': '*',
//   },
// };
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const configWithToken = (token) => {
  //   const config =
  return {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };
  //   return token;
};

const getFromApi = async (path, config = {}) => {
  try {
    const res = await axios.get(path, config);
    return res.data;
  } catch (error) {
    alert(error.response.data.errors[0].msg);
    throw error.response.data.errors;
  }
};

const postToApi = async (path, body, config = {}) => {
  try {
    const res = await axios.post(path, body, config);
    return res.data;
  } catch (error) {
    alert(error.response.data.errors[0].msg);
    throw error.response.data.errors;
  }
};

// Register User
export const register = async (body) => {
  return await postToApi('/api/users', body, config);
};

//Get All Reservations
export const getAllReservations = async () => {
  return await getFromApi('/api/reservations');
};
