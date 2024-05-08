import type { Preview } from "@storybook/react";
import React from 'react';
import '!style-loader!css-loader!postcss-loader!../app/globals.css';
import {ToastProvider} from '@/components/ui'

const preview: Preview = {
  decorators: (Story)=>{
    return <ToastProvider >
      <Story />
    </ToastProvider>
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
