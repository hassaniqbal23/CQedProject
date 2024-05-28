import http from '../utils/http';

export const UserCreateStories = (payload: { story: string }) =>
  http.post('/user-stories/create-user-story', payload);

export const getAllUserStories = () => http.get('/user-stories/all-stories');
