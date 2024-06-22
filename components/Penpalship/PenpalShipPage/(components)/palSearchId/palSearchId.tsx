import React, { useState } from 'react';
import { Typography } from '@/components/common/Typography/Typography';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Form, Label } from '@/components/ui';
import { FormInput } from '@/components/common/From/FormInput';
import { PenpalshipCard } from '@/components/Penpalship';
import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createPenpal, searchNewPenpal } from '@/app/api/penpals';
import SkeletonCard from '@/components/common/SkeletonCard/SkeletonCard';

const formSchema = z.object({
  memberId: z
    .string()
    .min(0, 'MemberID is required and must be a positive number'),
  userName: z
    .string()
    .min(0, 'Username is required and must be at least 2 characters long'),
});

interface IPalSearchID {
  userName?: string;
  memberId?: number;
}

export const PalSearchId = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useState<IPalSearchID | null>(null);
  const [creatingPanpalId, setCreatingPenpalId] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberId: '',
      userName: '',
    },
  });
  const {
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const { mutate: sendPenpalRequest, isLoading: isCreatingPanpal } =
    useMutation((id: number) => createPenpal({ receiverId: id }), {
      onSuccess: (res) => {
        if (searchParams) {
          queryClient.refetchQueries([
            'penpalSearchData',
            searchParams.memberId,
            searchParams.userName,
          ]);
        }
        setCreatingPenpalId(null);
      },
      onError: (error) => {
        console.error(error, 'Error =====> log');
      },
    });

  const { data: penpalSearchResult, isLoading } = useQuery(
    ['penpalSearchData', searchParams?.memberId, searchParams?.userName],
    () => searchNewPenpal(searchParams?.memberId, searchParams?.userName),
    {
      enabled: !!searchParams,
      onSuccess: (data) => {
        console.log({ data });
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  const onSubmit: SubmitHandler<any> = (values: IPalSearchID) => {
    setSearchParams(values);
    // form.reset();
  };
  return (
    <div>
      <Typography variant={'h3'} weight={'semibold'} className="mb-4">
        Search with an ID
      </Typography>
      <div className="pt-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
            <div className="flex items-center flex-wrap ">
              <div className="mb-3 px-5 flex-1">
                <Label>Member ID</Label>
                <FormInput
                  type="text"
                  form={form}
                  name="memberId"
                  placeholder={'search by member id'}
                />
              </div>
              <div className="mb-3 px-5 flex-1">
                <Label>User Name</Label>
                <FormInput
                  type="text"
                  form={form}
                  name="userName"
                  placeholder={'search by name'}
                />
              </div>
              <div className="flex-1 mt-2 pl-5">
                <Button className="w-full" size={'lg'}>
                  Search
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <>
        {isLoading ? (
          <SkeletonCard noOfCards={3} />
        ) : penpalSearchResult &&
          penpalSearchResult?.data?.data.length !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {penpalSearchResult?.data?.data.map((item: any, index: number) => {
              console.log(item, 'item')
              return (
                <div key={index}>
                  <PenpalshipCard
                    imgPath={item?.attachment?.file_path}
                    title={item?.name}
                    buttonText="Connect"
                    buttonOnClick={() => {
                      sendPenpalRequest(item.id);
                      setCreatingPenpalId(item.id);
                    }}
                    buttonLoading={
                      creatingPanpalId === item.id && isCreatingPanpal
                    }
                    description="Even though our cultural backgrounds and lifestyles were completely different..."
                    mutualFriends="5 mutual friends"
                    countryFlag={`/country-flags/svg/${item?.profile?.[0]?.country?.toLowerCase()}.svg`}
                    countryName={item?.profile?.country?.toUpperCase()}
                    studentAge={item?.profile?.age}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full col-span-3 h-96">
            <div>
              <Image
                className="ml-7 pb-8"
                height={128}
                width={128}
                alt="searched image"
                src="/assets/students/Search.svg"
              />
              <Typography
                variant={'h3'}
                weight={'semibold'}
                className="text-center text-primary-500 "
              >
                No search result
              </Typography>
            </div>
          </div>
        )}
      </>
    </div>
  );
};
