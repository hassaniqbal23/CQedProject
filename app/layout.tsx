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
import { Montserrat } from 'next/font/google';
import { EventBusProvider } from '@/components/Chat/EventBus/EventBus';
import { SocketProvider } from '@/components/Chat/WithSockets/WithSockets';
import { ChatGuardProvider } from '@/components/Chat/ChatProvider/ChatGuard';
import NextTopLoader from 'nextjs-toploader';

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
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
      <body suppressHydrationWarning={false} className={montserrat.className}>
        <NextTopLoader />

        <Toaster />
        <QueryClientProvider client={queryClient}>
          <EventBusProvider>
            <SocketProvider>
              <GlobalProvider>
                <ChatGuardProvider>
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
                </ChatGuardProvider>
              </GlobalProvider>
            </SocketProvider>
          </EventBusProvider>
        </QueryClientProvider>
        <Sonner richColors />
      </body>
    </html>
  );
}
