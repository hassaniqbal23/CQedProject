import http from '../utils/http';

export const getSuggestions = (page?: number, limit?: number) =>
  http.get(
    `/penpal/get-suggestions${page && limit ? `?page=${page}&limit=${limit}` : ``}`
  );

export const myPenpals = (page?: number, limit?: number) =>
  http.get(
    `/penpal/my-penpals${page && limit ? `?page=${page}&limit=${limit}` : ``}`
  );

export const createPenpal = (payload: any) =>
  http.post('/penpal/create-penpal', payload);

export const deletePenpal = (id: number) =>
  http.delete(`/penpal/${id}/delete-penpal`);

export const penpalsFilters = (payload: any) => {
  return http.post(`/penpal/search`, payload);
};
export const searchNewPenpal = (id?: number, userName?: string) =>
  http.get(
    `/penpal/pal-search?username=${userName ? userName : ''}&id=${id ? id : ''}`
  );

export const searchPenpal = (name: string, page?: number, limit?: number) =>
  http.get(
    `/penpal/search?name=${name}&${page && limit ? `?page=${page}&limit=${limit}` : ``}`
  );

export const pendingGlobalFriends = () => {
  return http.get(`/penpal/pending-penpals`).then((res) => res.data);
};
