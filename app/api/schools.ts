import http from '../utils/http';

export interface AcceptInvite {
  name: string;
  email: string;
  description?: string;
  address: string;
  country: string;
  phone: string;
  state: string;
}

export const AcceptInvite = (payload: AcceptInvite) =>
  http.post('/schools/create-school', payload);

export const getAllSubjectPath = () => '/subject/get-all';
export const getAllSubject = () => http.get(getAllSubjectPath());

export const getSchoolDashboardPath = () => '/dashboard/school-dashboard';
export const getSchoolDashboard = () => http.get(getSchoolDashboardPath());

export const getSchoolByIDPath = (id: number) => `/schools/${id}/get-school`;
export const getSchoolByID = (id: number) => http.get(getSchoolByIDPath(id));

export const getAllGradesPath = () => '/grades/get-grades';
export const getAllGrades = () => http.get(getAllGradesPath());

export const createSubject = (formValues: any) =>
  http.post('/subject/create', formValues);

export const updateSubject = (id: number, formValues: any) =>
  http.patch(`/subject/${id}/update`, formValues);

export const deleteSubject = (classId: number) =>
  http.delete(`/subject/${classId}/delete-subject`);

export const deleteStudent = (studentsId: number) =>
  http.delete(`/students/${studentsId}/delete-student`);

export const activeAndDeactiveGrade = (gradeId: number, status: number) =>
  http.patch(`/grades/${gradeId}/active`, { status: status });
