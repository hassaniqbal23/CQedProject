
import { AdminLayout } from "@/components/layouts/admin";
interface IProps {
  children: React.ReactNode;
}
export default function Layout({ children }: IProps) {
  return <AdminLayout>{children}</AdminLayout>;
}
