import http from '../utils/http';

export const UserCreateStories = (payload: { story: string }) =>
  http.post('/user-stories/create-user-story', payload);

export const getAllUserStories = () => http.get('/user-stories/all-stories');

export const getUserStoriesById = (storyId: number) =>
  http.get(`/user-stories/${storyId}/get-user-story`);

export const blockUser = (userId: number) =>
  http.post(`/block/create-block`, {
    blockedUserId: userId,
  });

export const getBlockedUsers = () => http.get(`/block/get-my-blocks`);

export const unblockUser = (userId: number) =>
  http.post(`/block/${userId}/delete-block`);
