import axios from 'axios';
import { getAccessToken, removeToken, removeUserId } from './encryption';

const localIP = process.env.NEXT_PUBLIC_API_HOST || 'http://0.0.0.0:3423';

const host =
  typeof window !== 'undefined' && window.location.hostname
    ? window.location.hostname
    : '';
const getBaseUrl = () => {
  let baseURL = '';
  if (host && host === 'cloud.quohr.com') {
    baseURL = 'https://api.cloud.quohr.com';
  } else if (host && host === 'staging.quohr.com') {
    baseURL = 'https://api.staging.quohr.com';
  } else {
    baseURL = localIP;
  }
  return baseURL;
};

const createHttpInstance = () => {
  const baseURL = getBaseUrl();
  const http = axios.create({
    baseURL,
  });

  const token = getAccessToken();
  if (token) {
    http.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  http.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        redirectToLoginPage();
      }
      return Promise.reject(error);
    },
  );

  return http;
};

const redirectToLoginPage = () => {
  window.location.href = '/login';
  removeUserId();
  removeToken();
};
const http = createHttpInstance();

export const updateToken = (token: string) => {
  http.defaults.headers['Authorization'] = `Bearer ${token}`;
  http.defaults.headers['Access-Control-Allow-Origin'] = '*';
  // set cookie for the token for 1 day
  document.cookie = `token=${token}; max-age=86400; path=/`;
};

export default http;
