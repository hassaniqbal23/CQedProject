import ProfilesView from '@/components/ProfilesVIew/ProfilesView';
import React from 'react';
import { cookies } from 'next/headers';
import axios from 'axios';
import { getGetProfilePath } from '@/app/api/students';

async function getData(userId: number) {
  const token = cookies().get('token')?.value;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}${getGetProfilePath(userId)}`,
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
      title: 'Not Found - Profile - CQED',
      description: 'Not Found - Profile - CQED',
    };
  }

  return {
    title: `${data?.profile?.full_name} - CQED`,
    description: data?.profile?.bio,
  };
}

export default function TeacherProfilePage() {
  return (
    <>
      <ProfilesView />
    </>
  );
}
