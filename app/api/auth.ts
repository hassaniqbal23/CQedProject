import http from '../utils/http';
import { IAuthentication } from './types';

export interface UpdatePasswordBody {
  password: string;
  confirm_password: string;
}

export const LoginAPI = (payload: IAuthentication) =>
  http.post('/auth/login', payload);

export const CreateStudentUser = (payload: IAuthentication) =>
  http.post('/students/create', payload);

export const UpdateUserPassword = (payload: UpdatePasswordBody) =>
  http.patch('/password/update-password', payload);
