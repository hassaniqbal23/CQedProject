'use client';
import { useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import { FormProvider, useForm } from 'react-hook-form';
import { GlobalProvider } from './globalContext/globalContext';
import { Toaster } from '@/components/ui/toaster/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner/sonner';
import { Montserrat } from 'next/font/google';
import { EventBusProvider } from '@/components/Chat/EventBus/EventBus';
import { SocketProvider } from '@/components/Chat/WithSockets/WithSockets';
import { ChatGuardProvider } from '@/components/Chat/ChatProvider/ChatGuard';
import NextTopLoader from 'nextjs-toploader';
import { ModuleProvider } from '@/components/ModuleProvider/ModuleProvider';
import { ChatProvider } from '@/components/Chat/ChatProvider/ChatProvider';
import { ClientOnly } from '@/components/GqedNotifications/ClientOnly';
import { GqedNotifications } from '@/components/GqedNotifications/GqedNotifications';

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
        <ModuleProvider>
          <QueryClientProvider client={queryClient}>
            <EventBusProvider>
              <GlobalProvider>
                <SocketProvider>
                  <ChatGuardProvider>
                    <ChatProvider>
                      <FormProvider {...methods}>
                        {children}
                        {/* </ThemeProvider> */}
                        <ToastContainer autoClose={1000} />
                        <ClientOnly>
                          <GqedNotifications />
                        </ClientOnly>
                      </FormProvider>
                    </ChatProvider>
                  </ChatGuardProvider>
                </SocketProvider>
              </GlobalProvider>
            </EventBusProvider>
          </QueryClientProvider>
        </ModuleProvider>
        <Sonner richColors />
      </body>
    </html>
  );
}
