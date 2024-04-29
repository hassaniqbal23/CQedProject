import { TeacherLayout } from '@/components/layouts/TeacherLayout';

interface IProps {
  children: React.ReactNode;
}
export default function Layout({ children }: IProps) {
  return <TeacherLayout>{children}</TeacherLayout>;
}
