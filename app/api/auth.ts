import http from '../utils/http';
import { IAuthentication } from './types';

export const LoginAPI = (payload: IAuthentication) =>
  http.post('/api/auth/login', payload);

export const CreateStudentUser = (payload: IAuthentication) =>
  http.post('/students/create', payload);
