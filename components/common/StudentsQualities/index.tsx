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
import { Button } from '@/components/ui/button/button';

interface IUserHobbiesUpdate {
  hobbies: string[];
}

const StudentsQualities: React.FC = () => {
  const { userInformation } = useGlobalState();
  const { module } = useModule();
  const queryClient = useQueryClient();
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [customInterest, setCustomInterest] = useState('');
  const [options, setOptions] = useState([
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
  ]);

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

  const handleAddInterest = () => {
    setShowInput((prev) => !prev);
  };

  const handleCustomInterestChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomInterest(e.target.value);
  };

  const handleAddCustomInterest = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter' && customInterest.trim() !== '') {
      const newOption = {
        label: customInterest.trim(),
        value: customInterest.trim(),
      };
      setOptions((prevOptions) => [newOption, ...prevOptions]);
      setSelectedHobbies((prevHobbies) => [
        ...prevHobbies,
        customInterest.trim(),
      ]);
      setCustomInterest('');
      setShowInput(false);
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
            options={options}
            onChange={(value) => setSelectedHobbies(value as string[])}
          />
        </div>
        <Button
          onClick={handleAddInterest}
          variant={'outline'}
          className="mt-3  px-3 py-2 rounded-full"
        >
          Add Your Own Interest
        </Button>
        {showInput && (
          <div className="mt-3 w-96">
            <input
              type="text"
              value={customInterest}
              onChange={handleCustomInterestChange}
              onKeyDown={handleAddCustomInterest}
              placeholder="Search for your hobbies or interests"
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        )}
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
