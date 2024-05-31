import React, { useState } from 'react';
import { Typography } from '@/components/common/Typography/Typography';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button, Form, Label } from '@/components/ui';
import { FormInput } from '@/components/common/From/FormInput';
import { PenpalshipCard } from '@/components/Penpalship';
import Image from 'next/image';

const formSchema = z.object({
  memberid: z
    .string()
    .min(0, 'MemberID is required and must be a positive number'),
  username: z
    .string()
    .min(0, 'Username is required and must be at least 2 characters long'),
});

interface IPalSearchID {
  username: string;
  memberid: string | undefined;
}

export const PalSearchId = () => {
  const [searchPenpalList, setSearchPenpalList] = useState<any>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberid: '',
      username: '',
    },
  });
  const {
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const onSubmit: SubmitHandler<IPalSearchID> = async (data: IPalSearchID) => {
    await setSearchPenpalList([data]);
    reset();
    console.log(data, 'checkingv');
  };

  return (
    <div>
      <Typography variant={'h3'} weight={'semibold'} className="mb-4">
        Search with an ID
      </Typography>
      <div className="pt-5">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
            <div className="flex items-center flex-wrap ">
              <div className="mb-3 px-5 flex-1">
                <Label>Member ID</Label>
                <FormInput
                  type="text"
                  form={form}
                  name="memberid"
                  placeholder={'search by member id'}
                />
              </div>
              <div className="mb-3 px-5 flex-1">
                <Label>Username</Label>
                <FormInput
                  type="text"
                  form={form}
                  name="username"
                  placeholder={'search by username'}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchPenpalList.length !== 0 ? (
          <>
            {searchPenpalList.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <PenpalshipCard
                    imgPath={'/Emily1.png'}
                    title={item?.username}
                    buttonText="Connect"
                    buttonOnClick={() => {
                      console.log('clicked');
                    }}
                    description="Even though our cultural backgrounds and lifestyles were completely different..."
                    mutualFriends="5 mutual friends"
                    countryName="Pakistan"
                    studentAge="8 years old"
                    countryFlag="/country-flags/svg/pk.svg"
                  />
                </div>
              );
            })}
          </>
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
      </div>
    </div>
  );
};
