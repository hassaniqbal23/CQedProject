import React from 'react';
import { AllMember } from '@/components/Communities/AllMembers/AllMember';
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
    };
  }

  return {
    title: `${data.name} Members - Communities - CQED`,
    description: data.description,
  };
}

const AllMembers = () => {
  return (
    <div>
      <AllMember />
    </div>
  );
};

export default AllMembers;
