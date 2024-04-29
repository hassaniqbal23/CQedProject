import { SchoolLayout } from '@/components/layouts/SchoolLayout';

interface IProps {
  children: React.ReactNode;
}
export default function Layout({ children }: IProps) {
  return <SchoolLayout>{children}</SchoolLayout>;
}
