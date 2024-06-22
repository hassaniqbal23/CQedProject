import http from "../utils/http";
import { number } from 'echarts';

export const getFeeds = (
  limit:number = 10,
  pageParam:number = 1
) => {
  return http.get(`/community-post/feeds?page=${pageParam}&limit=${limit}`);
};

export const  createPost = (payload: any) => {
    return http.post('/community-post/create-community-post', payload);
}