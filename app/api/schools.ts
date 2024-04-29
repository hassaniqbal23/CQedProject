import http from '../utils/http';

export interface AcceptInvite {
    name: string
    email: string
    description?: string,
    address: string,
    country: string,
    phone: string
    state: string
    inviteToken: string
}

export const AcceptInvite = (payload: AcceptInvite) =>
    http.post('/api/schools/create-school', payload);
