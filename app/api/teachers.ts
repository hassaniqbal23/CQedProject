import { ITeacherCreate } from '@/components/common/teacherProfile/type';
import http from '../utils/http';
import { IEducation, IWorkExperience } from '@/types/tearcher';

export const TeacherCreate = (payload: ITeacherCreate) =>
  http.post('/teachers/create', payload);

export const getInvitedTeachers = (
  page: string | number = 1,
  pageSize: number | string = 10
) => {
  return http.get(`/teachers/all-teachers?page=${page}&limit=${pageSize}`);
};

export const updateProfile = (
  payload: { bio: string; skills: string[] },
  id: number
) => {
  return http.patch(`/teachers/${id}/update`, {
    payload,
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

export const getDashboardData = () => {
  return http.get('/dashboard/dashboard');
};
// Education

export const createEducation = (payload: IEducation) =>
  http.post('/education/create', payload);

export const updateEducationById = (payload: IEducation, id: number) =>
  http.patch(`/education/${id}/update`, payload);

export const getEducationById = (id: number | null) =>
  http.get(`/education/${id}/get-education`).then((res) => {
    return res.data.data;
  });

export const getEducations = () =>
  http.get(`/education/get-educations`).then((res) => {
    return res.data.data;
  });

export const deleteEducationById = (id: number) =>
  http.delete(`/education/${id}/delete`);

//work Experience
export const createWorkExperience = (payload: IWorkExperience) =>
  http.post('/workExperience/create', payload);

export const updateworkExperienceById = (
  payload: IWorkExperience,
  id: number
) => http.patch(`/workExperience/${id}/update`, payload);
export const getWorkExperienceById = (id: number | null) =>
  http.get(`/workExperience/${id}/get-experience-by-id`).then((res) => {
    return res.data.data;
  });

export const getWorkExperience = () =>
  http.get(`/workExperience/get-work-experience`).then((res) => {
    return res.data.data;
  });

export const deleteworkExperienceById = (id: number) =>
  http.delete(`/workExperience/${id}/delete`);
