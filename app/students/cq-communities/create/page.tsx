'use client';

import { createCommunity, getCommunityTypes } from '@/app/api/communities';
import { CreateCommunityForm } from '@/components/common/CreateCommunityForm/CreateCommunityForm';
import { Typography } from '@/components/common/Typography/Typography';
import { useMutation, useQuery } from 'react-query';

const CreateCommunity = () => {
  const { mutate: handleCreateCommunity, isLoading: isCreatingCommunity } =
    useMutation(
      (communityData: {
        name: string;
        description: string;
        community_type: number;
      }) => createCommunity(communityData),
      {
        onSuccess: (res) => {},
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
      />
    </div>
  );
};

export default CreateCommunity;
