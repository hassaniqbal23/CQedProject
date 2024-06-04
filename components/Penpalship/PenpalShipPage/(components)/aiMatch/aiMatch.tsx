'use client';

import * as z from 'zod';
import React, { useEffect, useState } from 'react';
import { Button, FormControl, FormItem, Slider } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import ChipSelector from '@/components/ui/ChipSelect/ChipSelector';
import MultipleSelector from '@/components/common/From/MultiSelect';
import { ProfileNotification } from '@/components/AiMatches/ProfileNotifaction/ProfileNotifaction';
import { Form, FormField, FormLabel, FormMessage } from '@/components/ui';
import { SelectCountry } from '@/components/ui/select-v2/select-v2-components';
import { Typography } from '@/components/common/Typography/Typography';
import { useResponsive } from '@/lib/hooks';
import { CircleIcon } from '@/components/AiMatches/Circle/Circle';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createPenpal, deletePenpal, searchPenpals } from '@/app/api/penpals';
import { useRouter } from 'next/navigation';
import { useGlobalState } from '@/app/gobalContext/globalContext';

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
  gender: z.string().min(2, { message: 'Gender is required.' }),
  language: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .nonempty({ message: 'At least one language is required.' }),
});

interface AiMatchProps {
  module?: 'student' | 'teacher';
}

export const AiMatch = ({ module }: AiMatchProps) => {
  const { isMobile, isTabletMini, isDesktopOrLaptop } = useResponsive();
  const [interestsScore, setInterestsScore] = useState<number | null>(null);
  const { myPenpals } = useGlobalState();
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [queryParams, setQueryParams] = useState<string>('');
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery(
    ['search-penpals'],
    () => (queryParams ? searchPenpals(queryParams) : Promise.resolve(null)),
    {
      enabled: !!queryParams,
      onSuccess: (res) => {
        queryClient.refetchQueries('penpalSuggestions');
        queryClient.refetchQueries('MyPenPals');
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  useEffect(() => {
    if (data?.data?.data?.user?.interests && userInterests.length > 0) {
      const penpalInterests = data.data.data.user.interests.split(',');
      const matchingInterests = userInterests.filter((interest) =>
        penpalInterests.includes(interest)
      );
      const score = matchingInterests.length;
      setInterestsScore(score);
    }
  }, [data, userInterests]);

  const { mutate: sendPanpalRequest, isLoading: isCreatingPanpal } =
    useMutation((id: number) => createPenpal({ receiverId: id }), {
      onSuccess: (res) => {
        queryClient.refetchQueries('penpalSuggestions');
        queryClient.refetchQueries('MyPenPals');
      },
      onError: (error) => {
        console.error(error, 'Error =====> log');
      },
    });

  const { mutate: removePanpalRequest, isLoading: isDeletingPanpalRequest } =
    useMutation((id: number) => deletePenpal(id), {
      onSuccess: () => {
        queryClient.refetchQueries('MyPenPals');
      },
      onError: (error) => {
        console.log('Error unblocking user', error);
      },
    });

  const isUserPanpals = (id: number | string): boolean => {
    return myPenpals.some(
      (panpal: { receiverId: string | number; id: number | string }) =>
        panpal.receiverId === id
    );
  };

  const handleRemovePaypals = (id: number | string) => {
    const isPanpal = isUserPanpals(id);
    if (isPanpal) {
      // removePanpalRequest && removePanpalRequest(Number(id));
    } else {
      sendPanpalRequest && sendPanpalRequest(Number(id));
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: {},
      ageRange: [18, 51],
      interests: [],
      gender: '',
      language: [],
    },
  });

  console.log(isUserPanpals(data?.data.data.user.id), 'isUserPanpals');

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (values) => {
    const formattedValues = {
      country: values.country.value,
      gender: values.gender,
      ageFrom: values.ageRange[0],
      ageTo: values.ageRange[1],
      interests: values.interests.map((interest) => interest.value),
      languages: values.language.map((language) => language.value),
    };
    setQueryParams(formattedValues as any);
    setUserInterests(formattedValues.interests);
    form.reset();
  };

  const interestsMatch =
    interestsScore !== null
      ? `${interestsScore}/${userInterests.length} interests matched`
      : '';

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
                        {...field}
                        label=""
                        placeholder="Select a country or leave it to chance"
                      />
                    </FormControl>
                    <FormMessage />
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
                          { value: 'culture', label: 'Culture' },
                          { value: 'languages', label: 'Languages' },
                          { value: 'vulticulus', label: 'Vulticulus' },
                          { value: 'alias', label: 'Alias' },
                          { value: 'adventure', label: 'Adventure' },
                          { value: 'ait', label: 'Ait' },
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
                        defaultValue={['genders']}
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
        {data?.data ? (
          <div className={`order-1`}>
            <ProfileNotification
              heading="We have a match for you"
              buttonOnClick={() => handleRemovePaypals(data?.data.data.user.id)}
              countryFlag={`/country-flags/svg/${data?.data.data?.user?.country?.toLowerCase()}.svg`}
              notification="Hello"
              connect={
                isUserPanpals(data?.data.data.user.id) ? 'Remove' : 'Connect'
              }
              username={data?.data?.data?.fullname}
              screen={isMobile ? 'mobile' : isTabletMini ? 'tablet' : 'desktop'}
              country={data?.data?.data?.user?.country?.toUpperCase()}
              matches={interestsMatch}
              userImage={data?.data.data.user.attachment.file_path}
              userBio={`Hi I am ${data?.data?.data?.fullname}, a 24-year-old from ${data?.data?.data?.state} with a love for drawing and a passion for adventure`}
              caption={`Did you know ${data?.data?.data?.fullname} has read 20 books last year 📖 🙂`}
              onViewProfile={() => {
                if (module === 'teacher') {
                  router.push(`/schools/teachers/${data?.data.data.user.id}`);
                } else {
                  router.push(`/teachers/students/${data?.data.data.user.id}`);
                }
              }}
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
