import http from "../utils/http";


export const getInvitedSchools: any = (page: string | number = 1, pageSize: number | string = 10) => {
    return http.get(`/schools/all-schools?page=${page}&limit=${pageSize}`)
}

export const getInvites = (page: string | number = 1, pageSize: number | string = 10) => {
    return http.get(`/invitation/all-invites?page=${page}&limit=${pageSize}`)
}