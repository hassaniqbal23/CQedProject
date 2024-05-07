'use client';
import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import { FormProvider, useForm } from 'react-hook-form';
import { ThemeProvider } from '@/components/theme-provider';
import { getAccessToken } from './utils/encryption';
import { updateToken } from './utils/http';
import { GlobalProvider } from './gobalContext/globalContext';
import { Toaster } from '@/components/ui/toaster/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner/sonner';
import localFont from 'next/font/local';

const myFont = localFont({
  src: '../public/fonts/Montserrat-Regular.ttf',
  display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  // useEffect(() => {
  //   // Redirect to login if no access token
  //   const token = getAccessToken();
  //   if (token) {
  //     updateToken(token);
  //   } else if (!window.location.search) {
  //     router.push('/login');
  //   }
  // }, [router]);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: 1,
            staleTime: 5 * 1000,
          },
        },
      })
  );

  const methods = useForm();
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning={false} className={myFont.className}>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <GlobalProvider>
            <FormProvider {...methods}>
              {/* <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              > */}
              {children}
              {/* </ThemeProvider> */}
              <ToastContainer autoClose={1000} />
            </FormProvider>
          </GlobalProvider>
        </QueryClientProvider>
        <Sonner />
      </body>
    </html>
  );
}
