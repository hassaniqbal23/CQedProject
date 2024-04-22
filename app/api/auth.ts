import http from '../utils/http';
import {
  IAuthentication,
} from './types';

export const LoginAPI = (payload: IAuthentication) =>
  http.post('/auth/login', payload);