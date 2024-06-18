import { UniversityLayout } from '@/components/layouts/UniversityLayout';

interface IProps {
  children: React.ReactNode;
}
export default function Layout({ children }: IProps) {
  return <UniversityLayout>{children}</UniversityLayout>;
}
