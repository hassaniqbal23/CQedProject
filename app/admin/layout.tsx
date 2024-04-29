import { AdminLayout } from '@/components/layouts/AdminLayout';

interface IProps {
  children: React.ReactNode;
}
export default function Layout({ children }: IProps) {
  return <AdminLayout>{children}</AdminLayout>;
}
