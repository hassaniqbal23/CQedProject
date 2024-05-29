import http from '../utils/http';
// import { Invite } from './invitations';

export const startConversation = (id: string | number = 4) => {
  return http.post('/messages/chat', {
    toId: id,
  });
};

export const getAllConversations = () => {
  return http.get('/messages/get-conversations');
};

export const getConversationMessages = (id: string | number) => {
  return http.get(`/messages/all-messages?id=${id}`);
};
