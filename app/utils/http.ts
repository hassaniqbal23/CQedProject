import axios from 'axios';
import { getAccessToken, removeToken, removeUserId } from './encryption';
import { toast } from 'react-toastify';

const createHttpInstance = () => {
  let baseURL = process.env.NEXT_PUBLIC_API_HOST || '';
  if (process.env.NODE_ENV === 'production') {
    baseURL = '/api';
  }

  if (!baseURL.endsWith('/api')) {
    baseURL = `${baseURL}/api`;
  }

  const http = axios.create({
    baseURL,
  });

  const token = getAccessToken();
  if (token) {
    http.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  http.interceptors.response.use(
    (response) => {
      const show_message = response.data.show_message || false;
      if (show_message) {
        toast.success(response.data.message);
      }
      return response;
    },
    (error) => {
      const message =
        error.response?.data?.message ||
        error.response.data.error ||
        error.message ||
        'Something went wrong';
      toast.error(message);
      if (error.response && error.response.status === 401) {
        // redirectToLoginPage();
      }
      return Promise.reject(error);
    }
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
  if (typeof window !== 'undefined') {
    document.cookie = `token=${token}; max-age=86400; path=/`;
  }
};

export default http;
