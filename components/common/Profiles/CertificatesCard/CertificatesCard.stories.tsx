import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCertificates } from './CertificatesCard';

const meta = {
  title: 'Profiles/ProfileCertificates',
  component: ProfileCertificates,
  parameters: {},

  tags: ['autodocs'],
} satisfies Meta<typeof ProfileCertificates>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProfileCertificatesComponents: Story = {
  render: (args) => {
    return <ProfileCertificates {...args} />;
  },
  args: {
    title: 'Certificates',
    certificates: [
      {
        id: '1',
        name: 'Teaching Certificate',
        date: '02/04 2024',
        issueName: 'Certificate issuer',
      },
      {
        id: '2',
        name: 'Professional Development',
        date: '02/04 2024',
        issueName: 'Certificate issuer',
      },
    ],
  },
};
