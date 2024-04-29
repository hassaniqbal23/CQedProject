import http from '../utils/http';

export const Invite = (payload: { emails: string; type: string }) =>
  http.post('/api/invitation/invite', payload);

export const AllInvites = () => http.get('/api/invitation/all-invites');
