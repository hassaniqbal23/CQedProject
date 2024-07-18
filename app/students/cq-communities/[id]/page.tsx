import React from 'react';
import Community from '@/components/Communities/CommunityPage';
import { cookies } from 'next/headers';
import { getGetCommunityApiPath } from '@/app/api/communities';
import axios from 'axios';

async function getData(schoolId: number) {
  const token = cookies().get('token')?.value;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}${getGetCommunityApiPath(schoolId)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return (await response?.data?.data) || null;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const data = await getData(Number(params.id));

  if (!data) {
    return {
      title: 'Not Found - Communtiy - CQED',
      description: 'Not Found - Communtiy - CQED',
      icons: '/favi.png',
    };
  }

  return {
    title: `${data.name} - Communities - CQED`,
    description: data.description,
    icons: '/favi.png',
  };
}

const CQCommunity = () => {
  return (
    <div>
      <Community module="students" />
    </div>
  );
};

export default CQCommunity;
