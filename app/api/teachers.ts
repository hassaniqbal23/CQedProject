import { ITeacherCreate } from '@/components/common/teacherProfile/type';
import http from '../utils/http';

export const TeacherCreate = (payload: ITeacherCreate) =>
  http.post('/teachers/create', payload);

export const getInvitedTeachers = (
  page: string | number = 1,
  pageSize: number | string = 10
) => {
  return http.get(`/teachers/all-teachers`);
};

export const updateProfile = (meta: { bio: string }) => {
  return http.patch('/users/update-profile', {
    meta,
  });
};
