import http from '../utils/http';
import { IStudentInfo } from './types';

export const StudentsCreate = (payload: IStudentInfo) =>
  http.post('/students/create', payload);
