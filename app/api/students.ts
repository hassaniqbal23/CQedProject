import http from '../utils/http';
import { IStudentInfo } from './types';

export const StudentsCreate = (payload: IStudentInfo) =>
  http.post('/students/create', payload);

export const getAllStudents: any = (
  page: string | number = 1,
  pageSize: number | string = 10
) => {
  return http.get(`/students/all-students?page=${page}&limit=${pageSize}`);
};
