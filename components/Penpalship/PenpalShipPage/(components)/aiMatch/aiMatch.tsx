'use client';

import * as z from 'zod';
import React, { useEffect, useState } from 'react';
import { Button, FormControl, FormItem, Slider } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import ChipSelector from '@/components/ui/ChipSelect/ChipSelector';
import MultipleSelector from '@/components/common/From/MultiSelect';
import { Form, FormField, FormLabel, FormMessage } from '@/components/ui';
import { SelectCountry } from '@/components/ui/select-v2/select-v2-components';
import { Typography } from '@/components/common/Typography/Typography';
import { useResponsive } from '@/lib/hooks';
import { CircleIcon } from '@/components/AiMatches/Circle/Circle';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { penpalsFilters } from '@/app/api/penpals';
import { useRouter } from 'next/navigation';
import { UserProfileMatch } from '@/components/AiMatches/UserProfileMatch/UserProfileMatch';
import { useGlobalState } from '@/app/globalContext/globalContext';
import useSendPenpalRequest from '@/lib/useSendPenpalRequest';
import { useModule } from '@/components/ModuleProvider/ModuleProvider';

const formSchema = z.object({
  country: z.object({
    value: z.string().min(2, { message: 'Country is required.' }),
  }),
  ageRange: z.array(z.number()).min(2, { message: 'Select Age range.' }),
  interests: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .nonempty({ message: 'At least one interest is required.' }),
  gender: z.string().optional(),
  language: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .nonempty({ message: 'At least one language is required.' }),
});

interface ISearchAI {
  ageFrom?: number;
  ageTo?: number;
  country?: string;
  gender?: string;
  interests?: string[];
  languages?: string[];
}

export const AiMatch = () => {
  const { isMobile, isTabletMini, isDesktopOrLaptop } = useResponsive();
  const [interestsScore, setInterestsScore] = useState<number | null>(null);
  const { myPenpals } = useGlobalState();
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [showUserProfile, setShowUserProfile] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { module } = useModule();

  const { sendRequest, deleteRequest } = useSendPenpalRequest();

  const {
    mutate: SearchPenpal,
    data: FiltersData,
    isLoading,
  } = useMutation(
    ['search-penpals'],
    (data: ISearchAI) => penpalsFilters(data as ISearchAI),
    {
      onSuccess(data) {
        queryClient.refetchQueries('penpalSuggestions');
        queryClient.refetchQueries('MyPenPals');
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  useEffect(() => {
    if (FiltersData?.data?.data?.interests && userInterests.length > 0) {
      const penpalInterests = FiltersData?.data.data.interests;
      const matchingInterests = userInterests.filter((interest) =>
        penpalInterests.includes(interest)
      );
      const score = matchingInterests.length;
      setInterestsScore(score);
    }
  }, [FiltersData, userInterests]);

  const isUserPanpals = (id: number | string): any => {
    return myPenpals.find(
      (panpal: { receiverId: string | number; id: number | string }) =>
        panpal.receiverId === id
    );
  };

  const handleRemovePaypals = (id: number | string) => {
    const myPenpal = isUserPanpals(id);
    if (myPenpal) {
      deleteRequest(Number(myPenpal.id));
      setTimeout(() => {
        setShowUserProfile(false);
        form.reset();
      }, 1000);
    } else {
      sendRequest({ receiverId: Number(id) });
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: undefined,
      ageRange: [18, 51],
      interests: [],
      gender: '',
      language: [],
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (values) => {
    const formattedValues: ISearchAI = {
      country: values.country.value,
      gender: values.gender,
      ageFrom: values.ageRange[0],
      ageTo: values.ageRange[1],
      interests: values.interests.map((interest) => interest.value),
      languages: values.language.map((language) => language.value),
    };
    SearchPenpal(formattedValues);
    if (formattedValues?.interests) {
      setUserInterests(formattedValues?.interests);
    }
  };

  useEffect(() => {
    if (FiltersData?.data) {
      setShowUserProfile(true);
    }
  }, [FiltersData?.data]);

  const interestsMatch =
    interestsScore !== null
      ? `${interestsScore}/${userInterests.length} interests matched`
      : '';

  const handleViewProfile = () => {
    router.push(`/${module}/profile/${FiltersData?.data.data.user.id}`);
  };

  return (
    <>
      <div className="mt-4">
        <Typography variant={'h3'} weight={'semibold'} className="mb-4">
          Find a penpal
        </Typography>
        <Typography variant={'body'} weight={'regular'}>
          Please fill in the below information to match you with the right Pal
        </Typography>
      </div>

      <div
        className={`grid gap-12 ${isDesktopOrLaptop ? 'grid-cols-2 ' : 'grid-cols-1'}`}
      >
        <div className={`order-${isDesktopOrLaptop ? '2' : '1'}`}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <SelectCountry
                        menuPosition={'fixed'}
                        {...field}
                        placeholder="Select a country or leave it to chance"
                      />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ageRange"
                render={({ field }) => (
                  <FormItem className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                      <FormLabel>Age Range</FormLabel>
                      <Typography variant={'body'} weight={'regular'}>
                        (Between 18 to 70)
                      </Typography>
                    </div>
                    <div>
                      <Controller
                        name="ageRange"
                        control={form.control}
                        render={({ field }) => (
                          <div className="flex items-center ">
                            <Typography variant={'body'} weight={'medium'}>
                              18
                            </Typography>
                            <Slider
                              className="mx-2"
                              max={70}
                              min={18}
                              value={field.value}
                              step={1}
                              onValueChange={field.onChange}
                            />
                            <Typography variant={'body'} weight={'medium'}>
                              70
                            </Typography>
                          </div>
                        )}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem className="mt-12">
                    <FormLabel>Interests</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Add interests"
                        options={[
                          { value: 'Culture', label: 'Culture' },
                          { value: 'Languages', label: 'Languages' },
                          { value: 'Hiking', label: 'Hiking' },
                          { value: 'Walking', label: 'Walking' },
                          { value: 'Adventure', label: 'Adventure' },
                          { value: 'Writing', label: 'Writing' },
                          { value: 'Cooking', label: 'Cooking' },
                          { value: 'Yoga', label: 'Yoga' },
                          { value: 'Gym', label: 'Gym' },
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <ChipSelector
                        {...field}
                        variant="outlined"
                        size={'sm'}
                        defaultValue={[form.getValues('gender')]}
                        options={[
                          { label: 'Male', value: 'Male' },
                          { label: 'Female', value: 'Female' },
                          { label: 'Any', value: 'Any' },
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem className="mt-10">
                    <FormLabel>Languages</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        {...field}
                        onChange={field.onChange}
                        placeholder="Add language"
                        options={[
                          { label: 'Urdu', value: 'Urdu' },
                          { label: 'Persian', value: 'Persian' },
                          { label: 'English', value: 'English' },
                          { label: 'Korean', value: 'Korean' },
                          { label: 'Italian', value: 'Italian' },
                          { label: 'Spanish', value: 'Spanish' },
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant={'outline'}
                loading={isLoading}
                size={'md'}
                className="w-full bg-primary-50 mt-14"
              >
                Search
              </Button>
            </form>
          </Form>
        </div>
        {showUserProfile && FiltersData?.data?.data ? (
          <div className={`order-1`}>
            <UserProfileMatch
              user={FiltersData?.data?.data}
              onButtonClick={() =>
                handleRemovePaypals(FiltersData?.data?.data?.user?.id)
              }
              buttonText={isUserPanpals(FiltersData?.data?.data?.user?.id)} //return user
              screenType={
                isMobile ? 'mobile' : isTabletMini ? 'tablet' : 'desktop'
              }
              interestsMatched={interestsMatch}
              onViewProfile={handleViewProfile}
            />
          </div>
        ) : (
          <>
            <CircleIcon userImage={'/assets/profile/profile.svg'} />
          </>
        )}
      </div>
    </>
  );
};
