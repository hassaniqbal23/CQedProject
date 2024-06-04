import { number } from 'echarts';
import http from '../utils/http';

export const getCommunities = (
  search?: string | null,
  community_type: number | string | null = '',
  page?: number,
  limit?: number
) => {
  return http
    .get(
      `/community/all-communities${page && limit ? `?page=${page}&limit=${limit}` : ``}`,
      {
        params: {
          search,
          community_type: community_type,
        },
      }
    )
    .then((res) => res.data);
};

export const getCommunityTypes = (search?: string | null) => {
  return http
    .get('/community-type/all-types', {
      params: {
        community_search: search,
      },
    })
    .then((res) => res.data);
};

export const getCommunity = (id: any) => {
  return http.get(`/community/${id}/get-community`).then((res) => res.data);
};

export const createCommunity = (payload: any) => {
  return http.post('/community/create-community', payload);
};

export const updateCommunity = (id: number, payload: any) => {
  return http.patch(`/communities/${id}`, payload);
};

export const deleteCommunity = (id: number) => {
  return http.delete(`/communities/${id}`);
};

export const joinCommunity = (payload: any) => {
  return http.post(`/community-user/create-community-user`, payload);
};

export const leaveCommunity = (communityId: number, userId: number) => {
  return http.delete(`/community-user/delete-community-user`, {
    params: { communityId, userId },
  });
};

export const getCommunityMembers = (id: number) => {
  return http.get(`/communities/${id}/members`);
};

export const getCommunityPosts = (
  id: number | string,
  page = 1,
  limit = 10
) => {
  return http
    .get(
      `/community-post/all-community-posts?page=${page}&limit=${limit}&id=${id}`
    )
    .then((res) => res.data);
};

export const getCommunityPost = (id: number, postId: number) => {
  return http.get(`/communities/${id}/posts/${postId}`);
};

export const createCommunityPost = (payload: any) => {
  return http.post(`/community-post/create-community-post`, payload);
};

export const uploadImage = (payload: any) => {
  return http.post(`/uploads/upload`, payload);
};

export const deleteImage = (id: number | string) => {
  return http.delete(`/uploads/${id}/delete`);
};

export const updateCommunityPost = (
  id: number,
  postId: number,
  payload: any
) => {
  return http.patch(`/communities/${id}/posts/${postId}`, payload);
};

export const deleteCommunityPost = (id: number, postId: number) => {
  return http.delete(`/communities/${id}/posts/${postId}`);
};

export const getCommunityPostComments = (id: number, postId: number) => {
  return http.get(`/communities/${id}/posts/${postId}/comments`);
};

export const communityPostComment = (payload: {
  communityPostId: number;
  content: string;
}) => {
  return http.post(
    `/community-post-comment/create-community-post-comment`,
    payload
  );
};

export const updateCommunityPostComment = (
  id: number,
  postId: number,
  commentId: number,
  payload: any
) => {
  return http.patch(
    `/communities/${id}/posts/${postId}/comments/${commentId}`,
    payload
  );
};

export const deleteCommunityPostComment = (
  id: number,
  postId: number,
  commentId: number
) => {
  return http.delete(
    `/communities/${id}/posts/${postId}/comments/${commentId}`
  );
};

export const likeCommunityPost = (postId: number) => {
  return http.post(`/community-post-like/create-community-post-like`, {
    communityPostId: postId,
  });
};

export const unlikeCommunityPost = (id: number) => {
  return http.delete(`/community-post-like/${id}/delete-community-post-like`);
};

export const getStudentsFeeds = (
  id: number,
  limit = 10,
  pageParam = number
) => {
  return http.get(`/community/2/feeds?page=${1}&limit=10`);
};

export const getStudentCommunities = (id: number) => {
  return http.get(`/users/${id}/communities`);
};

export const getCommunityJoined = (page: number = 1, limit: number = 10) => {
  return http
    .get(`/community/communities-joined?page=${page}&limit=${limit}`)
    .then((res) => res.data);
};
export const getMyCommunity = (page: number = 1, limit: number = 10) => {
  return http
    .get(`/community/my-communities?page=${page}&limit=${limit}`)
    .then((res) => res.data);
};
