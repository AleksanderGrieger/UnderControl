import axios from 'axios';
// import setAuthToken from '../utils/setAuthToken';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};
const configWithToken = (token) => {
  const config = {
    headers: {
      //   'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };
  return config;
};

// Load User
export const loadUser = async (token) => {
  return await getFromApi('/api/auth', configWithToken(token));
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
  const res = await postToApi('/api/users', body, config);
  console.log(res.token);
  return await loadUser(res.token);
};

// Login User
export const login = async (body) => {
  const res = await postToApi('/api/auth', body, config);
  console.log(res.token);
  return await loadUser(res.token);
};

//Get All Reservations
export const getAllReservations = async () => {
  return await getFromApi('/api/reservations');
};