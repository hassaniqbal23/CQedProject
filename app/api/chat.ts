import http from '../utils/http';
// import { Invite } from './invitations';

export const startConversation = (id: string | number = 4) => {
    return http.post('/messages/chat', {
        toId: id
    })
}

export const getAllConversations = () => {
    return http.get('/messages/get-conversations')
}