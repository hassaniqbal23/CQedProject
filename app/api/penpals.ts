import http from '../utils/http';

export const getSuggestions = () => http.get('/penpal/get-suggestions');

export const myPenpals = () => http.get('/penpal/my-penpals');

export const createPenpal = (payload: any) =>
  http.post('/penpal/create-penpal', payload);

export const deletePenpal = (id: number) =>
  http.delete(`/penpal/${id}/delete-penpal`);

export const searchPenpals = (payload: string) => {
  return http.post(`/penpal/search`, payload);
};
