'use client';
import { MainLayout } from '@/components/mainlayout';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAccessToken } from './utils/encryption';
import { AdminLayout } from '@/components/layouts/admin';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const router = useRouter();

 

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const isLoginUser = getAccessToken();
      if (isLoginUser) {
        setUserLoggedIn(true);
        setLoading(false);
      } else {
        setLoading(false);
        router.push('/login');
      }
    };

    checkUserAuthentication();
  }, [router]);

  if (!userLoggedIn) {
    return (
      <div className="flex flex-col md:flex-row justify-center items-center h-screen">
        <Loader2 className="mr-0 md:mr-2 h-10 w-10 animate-spin text-primary text-5xl text-centers" />
        <span className="flex items-center text-center text-foreground text-3xl">
          Loading...
        </span>
      </div>
    );
  }


  return (
    <AdminLayout>
      <h3 className="text-center text-5xl font-bold pt-20">Coming Soon!</h3>
    </AdminLayout>
  );
}
