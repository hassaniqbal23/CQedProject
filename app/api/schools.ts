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

export const getAllGrades = () => http.get('/grades/get-grades');

export const createSubject = (formValues: any) =>
  http.post('/classes/create', formValues);

export const deleteSubject = (classId: number) =>
  http.delete(`/classes/${classId}/delete-class`);

export const deleteStudent = (studentsId: number) =>
  http.delete(`/students/${studentsId}/delete-student`);
