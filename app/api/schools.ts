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

export const getAllClass = () => http.get('/classes/get-all');

export const getSchoolDashboard = () => http.get('/dashbord/school-dashbord');

export const getAllGrades = () => http.get('/grades/get-grades');

export const createSubject = (formValues: any) =>
  http.post('/classes/create', formValues);

export const updateSubject = (id: number, formValues: any) =>
  http.patch(`/classes/${id}/update`, formValues);

export const deleteSubject = (classId: number) =>
  http.delete(`/classes/${classId}/delete-class`);

export const deleteStudent = (studentsId: number) =>
  http.delete(`/students/${studentsId}/delete-student`);

export const activeAndDeactiveGrade = (gradeId: number, status: number) =>
  http.patch(`/grades/${gradeId}/active`, { status: status });
