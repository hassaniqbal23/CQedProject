import { ITeacherCreate } from '@/components/common/teacherProfile/type';
import http from '../utils/http';
import { IUserInformation } from '../globalContext/types';

export const TeacherCreate = (payload: ITeacherCreate) =>
  http.post('/teachers/create', payload);

export const getInvitedTeachers = (
  page: string | number = 1,
  pageSize: number | string = 10
) => {
  return http.get(`/teachers/all-teachers?page=${page}&limit=${pageSize}`);
};

export const updateProfile = (meta: { bio: string }) => {
  return http.patch('/users/update-profile', {
    meta,
  });
};

export const deleteTeacher = (id: number) =>
  http.delete(`/teachers/${id}/delete-teacher`);

export const getProfiledata = async (id: number | string) => {
  return http.get(`/teachers/${id}/get-teacher`);
};

export const getTeachersBySearch = (
  page: string | number = 1,
  pageSize: number | string = 10,
  search: string
) => {
  return http.get(
    `/teachers/search?page=${page}&limit=${pageSize}&name=${search}`
  );
};

export const teacherUpdateProfile = (
  profileId: number,
  payload: IUserInformation
) => {
  return http.patch(`/teachers/${profileId}/update-teacher`, payload);
  export const getDashboardData = () => {
    return http.get('/dashboard/dashboard');
  };
