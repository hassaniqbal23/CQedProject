import React from 'react';
import { cookies } from 'next/headers';
import { SchoolProfileView } from '@/components/common/Profiles/SchoolProfileView/SchoolProfileView';
import { getSchoolByIDPath } from '@/app/api/schools';
import axios from 'axios';

async function getData(schoolId: number) {
  const token = cookies().get('token')?.value;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_HOST}${getSchoolByIDPath(schoolId)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return (await response?.data?.data) || null;
}

export async function generateMetadata({
  params,
}: {
  params: { profile: string };
}) {
  const data = await getData(Number(params.profile));
  return {
    title: `${data.name ? data.name + ' -' : ''}  Universities - CQED`,
    description: data?.description || 'Universities - CQED',
  };
}

export default async function UniversityProfile({
  params,
}: {
  params: { profile: string };
}) {
  const data = await getData(Number(params.profile));
  return <SchoolProfileView defaultData={data} id={Number(params.profile)} />;
}
