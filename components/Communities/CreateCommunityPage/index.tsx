import React from 'react';
import { createCommunity, getCommunityTypes } from '@/app/api/communities';
import { CreateCommunityForm } from '@/components/common/CreateCommunityForm/CreateCommunityForm';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/navigation';

interface CreateCommunityPageProps {
  module?: 'students' | 'teachers';
}

const CreateCommunityPage: React.FC<CreateCommunityPageProps> = ({
  module = 'students',
}) => {
  const router = useRouter();
  const { mutate: handleCreateCommunity, isLoading: isCreatingCommunity } =
    useMutation(
      (communityData: {
        name: string;
        description: string;
        community_type: number;
      }) => createCommunity({ ...communityData, users: [] }),
      {
        onSuccess: (res) => {
          router.push(`/${module}/cq-communities/${res.data.data.id}`);
        },
        onError: (error: any) => {
          console.log(error, 'Error =====> log');
        },
      }
    );

  const { data: community_types_data, isLoading: community_types_isLoading } =
    useQuery(['search_community_types'], () => getCommunityTypes());
  return (
    <div className="bg-white">
      <CreateCommunityForm
        CommunityTypeOptions={
          community_types_data ? community_types_data?.data || [] : []
        }
        onFormSubmit={(values) => {
          handleCreateCommunity(values);
        }}
        loading={isCreatingCommunity || community_types_isLoading}
        // students={
        //   data?.data.data.filter((item:any) => item.id !== userInformation.id) || []
        // }
        // isLoadingAllStudents={isLoadingAllStudents}
      />
    </div>
  );
};

export default CreateCommunityPage;
