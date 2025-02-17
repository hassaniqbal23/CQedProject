import http from '../utils/http';
import { number } from 'echarts';

export const getFeeds = (limit: number = 10, pageParam: number = 1) => {
  return http.get(`/community-post/feeds?page=${pageParam}&limit=${limit}`);
};

export const createPost = (payload: any) => {
  return http.post('/community-post/create-community-post', payload);
};

export const deletePost = (id: number) => {
  return http.delete(`/community-post/${id}/delete-community-post`);
};

export const getUserFeed = (
  id: number | string,
  limit: number = 10,
  pageParam: number = 1
) => {
  return http.get(
    `/community-post/view-feeds?id=${id}&page=${pageParam}&limit=${limit}`
  );
};

export const commentLike = (communityPostCommentId: number) => {
  return http.post(
    '/community-post-comment/create-community-post-comment-like',
    { communityPostCommentId }
  );
};

export const commentUnlike = (id: number) => {
  return http.delete(
    `/community-post-comment/${id}/delete-community-post-comment-like`
  );
};
