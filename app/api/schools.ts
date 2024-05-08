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


export const getAllClass = () =>
  http.get('/classes/get-all');

export const getAllGrades = () =>
  http.get('/grades/get-grades');
