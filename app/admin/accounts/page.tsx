import AccountsList from '@/components/PageContainers/Admin/AccountsList/AccountsList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accounts - Admin - GCED',
  description: 'Accounts - Admin - GCED',
};

const AdminAccountsPage = () => {
  return <AccountsList></AccountsList>;
};

export default AdminAccountsPage;
