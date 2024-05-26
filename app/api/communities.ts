import http from '../utils/http';

export const getCommunities = (search?: string | null) => {
  return http
    .get('/community/all-communities', {
      params: {
        search,
      },
    })
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
  return http.post('/communities', payload);
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

export const getCommunityPosts = (id: number) => {
  return http.get(`/communities/${id}/posts`);
};

export const getCommunityPost = (id: number, postId: number) => {
  return http.get(`/communities/${id}/posts/${postId}`);
};

export const createCommunityPost = (payload: any) => {
  return http.post(`/community-post/create-community-post`, payload);
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

export const createCommunityPostComment = (
  id: number,
  postId: number,
  payload: any
) => {
  return http.post(`/communities/${id}/posts/${postId}/comments`, payload);
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

export const likeCommunityPost = (id: number, postId: number) => {
  return http.post(`/communities/${id}/posts/${postId}/like`);
};

export const unlikeCommunityPost = (id: number, postId: number) => {
  return http.delete(`/communities/${id}/posts/${postId}/like`);
};
