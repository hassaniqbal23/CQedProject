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

export const getStudentProfile = (id: number | string) => {
  return http.get(`/students/${id}/get-student`);
};
export const getProfile = (id: number | string) => {
  return http.get(`/users/${id}/view-profile`);
};

export const getStudentBySearch = (
  page: string | number = 1,
  pageSize: number | string = 10,
  search: string
) => {
  return http.get(
    `/students/search?page=${page}&limit=${pageSize}&name=${search}`
  );
};
