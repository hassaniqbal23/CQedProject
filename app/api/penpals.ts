import http from '../utils/http';

export const getSuggestions = (page?: number, limit?: number) =>
  http.get(
    `/penpal/get-suggestions${page && limit ? `?page=${page}&limit=${limit}` : ``}`
  );

export const myPenpals = () => http.get('/penpal/my-penpals');

export const createPenpal = (payload: any) =>
  http.post('/penpal/create-penpal', payload);

export const deletePenpal = (id: number) =>
  http.delete(`/penpal/${id}/delete-penpal`);
