import http from '../utils/http';
// import { Invite } from './invitations';

export const startConversation = (
  id: string | number = 4,
  message: string | null = null
) => {
  return http.post('/messages/chat', {
    receiverId: id,
    message: message,
  });
};

export const getAllConversations = () => {
  return http.get('/messages/get-conversations');
};

export const getConversationMessages = (id: string | number | null) => {
  return http.get(`/messages/all-messages?id=${id}`);
};

export const deleteMessage = (id: string | number) => {
  return http.delete(`/messages/${id}/delete-message`);
};

export const deleteConversation = (id: string | number) => {
  return http.delete(`/messages/${id}/delete-conversation`);
};

export const uploadFile = async (file: Blob) => {
  const formData = new FormData();
  formData.append('file', file);

  return await http.post('/uploads/upload', formData).then((res) => res.data.data);
};
