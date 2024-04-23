import { MainLayout } from '@/components/mainlayout';

interface IProps {
  children: React.ReactNode;
}
export default function Layout({ children }: IProps) {
  return <MainLayout>{children}</MainLayout>;
}
