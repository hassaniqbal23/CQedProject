import { StudentsLayout } from '@/components/layouts/StudentsLayout';

interface IProps {
  children: React.ReactNode;
}
export default function Layout({ children }: IProps) {
  return <StudentsLayout>{children}</StudentsLayout>;
}
