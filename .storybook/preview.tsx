import type { Preview } from "@storybook/react";
import React, { useState } from 'react';
import '!style-loader!css-loader!postcss-loader!../app/globals.css';
import {ToastProvider} from '@/components/ui'
import { QueryClient, QueryClientProvider } from 'react-query';

const preview: Preview = {
  decorators: (Story)=>{
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
    return  (<QueryClientProvider client={queryClient}><ToastProvider >
      <Story />
    </ToastProvider>
    </QueryClientProvider>)
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
