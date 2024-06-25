import React, { useState } from 'react';
import Progressbar from '../Progressbar/Progressbar';
import BottomNavbar from '../navbar/bottomNavbar';
import ChipSelector from '../../ui/ChipSelect/ChipSelector';
import { useRouter } from 'next/navigation';
import { Typography } from '../Typography/Typography';
import { useModule } from '@/components/ModuleProvider/ModuleProvider';
import { useMutation, useQueryClient } from 'react-query';
import { userUpdateProfile } from '@/app/api/users';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { toast } from 'sonner'; // Assuming 'sonner' is a valid toast library
import { IUserInformation } from '@/app/globalContext/types';

interface IUserHobbiesUpdate {
  hobbies: string[];
}

const StudentsQualities: React.FC = () => {
  const { userInformation } = useGlobalState();
  const { module } = useModule();
  const queryClient = useQueryClient();
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { mutate: updateProfile, isLoading: isUpdatingProfile } = useMutation(
    (data: { profileId: number; payload: IUserHobbiesUpdate }) =>
      userUpdateProfile(data.profileId, data.payload as IUserInformation),
    {
      onSuccess: (res) => {
        toast.success(`${res.data.message}`, { position: 'bottom-center' });
        queryClient.invalidateQueries('userInformation');
        router.push(`/${module}/onboarding/success`);
      },
      onError: (error: any) => {
        console.error('Error updating profile:', error);
        toast.error('Failed to submit hobbies', { position: 'bottom-center' });
        setIsSubmitting(false);
      },
    }
  );

  const handleContinue = async () => {
    if (!isSubmitting) {
      const payload: IUserHobbiesUpdate = { hobbies: selectedHobbies };

      if (userInformation?.profile?.id) {
        setIsSubmitting(true);
        await updateProfile({ profileId: userInformation.profile.id, payload });
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col max-w-3xl mx-auto mt-8 h-screen items-center">
        <div className="mb-6 flex w-3/5">
          <Progressbar heading="You are almost there." percentage={75} />
        </div>
        <div className="flex flex-col justify-center items-center mb-4">
          <Typography
            variant={'h1'}
            weight={'bold'}
            className="text-primary text-center mb-3 text-balance"
          >
            What are your hobbies? What are you interested in?
          </Typography>
          <Typography
            variant={'h4'}
            weight={'regular'}
            className="text-[#a3adbc] text-balance mb-6"
          >
            We match you with peers based on common interests.
          </Typography>
        </div>
        <div className="flex items-center w-2/3 mx-auto">
          <ChipSelector
            rounded
            multiSelect
            size="md"
            options={[
              { label: 'Gardening', value: 'Gardening' },
              { label: 'Adventure', value: 'Adventure' },
              { label: 'Fitness', value: 'Fitness' },
              { label: 'Music', value: 'Music' },
              { label: 'Nature', value: 'Nature' },
              { label: 'Dancing', value: 'Dancing' },
              { label: 'Beauty', value: 'Beauty' },
              { label: 'Drawing', value: 'Drawing' },
              { label: 'Handicraft', value: 'Handicraft' },
              { label: 'Sports', value: 'Sports' },
              { label: 'Writing', value: 'Writing' },
              { label: 'Books', value: 'Books' },
              { label: 'Culture', value: 'Culture' },
              { label: 'Animals', value: 'Animals' },
              { label: 'Cooking', value: 'Cooking' },
              { label: 'Movies', value: 'Movies' },
              { label: 'Computers', value: 'Computers' },
              { label: 'Others - Tell us what.', value: 'Others' },
            ]}
            onChange={(value) => setSelectedHobbies(value as string[])}
          />
        </div>
      </div>
      <BottomNavbar
        isBackButton={true}
        onBackButton={() => router.back()}
        onContinue={handleContinue}
        buttonLoading={isSubmitting || isUpdatingProfile}
      />
    </>
  );
};

export default StudentsQualities;
