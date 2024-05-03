import { ITeacherCreate } from '@/components/common/teacherProfile/type';
import http from '../utils/http';

export const TeacherCreate = (payload: ITeacherCreate) =>
  http.post('/teachers/create', payload);
