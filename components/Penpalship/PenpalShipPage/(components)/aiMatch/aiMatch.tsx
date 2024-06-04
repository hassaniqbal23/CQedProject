'use client';

import * as z from 'zod';
import React from 'react';
import { Button, FormControl, FormItem, Slider } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import ChipSelector from '@/components/ui/ChipSelect/ChipSelector';
import MultipleSelector from '@/components/common/From/MultiSelect';
import { ProfileNotification } from '@/components/AiMatches/ProfileNotifaction/ProfileNotifaction';
import { Form, FormField, FormLabel, FormMessage } from '@/components/ui';
import { SelectCountry } from '@/components/ui/select-v2/select-v2-components';
import { Typography } from '@/components/common/Typography/Typography';
import { useState } from 'react';
import { useResponsive } from '@/lib/hooks';

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

export const AiMatch = () => {
  const { isMobile, isTabletMini, isDesktopOrLaptop } = useResponsive();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: {},
      ageRange: [18, 21],
      interests: [],
      gender: '',
      language: [],
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (values) => {
    console.log(values);
  };

  const handleRangeChange = (value: React.SetStateAction<number[]>) => {
    setRange(value);
  };

  const [range, setRange] = useState([18, 25]);

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
          {!isDesktopOrLaptop && (
            <ProfileNotification
              heading="We have a match for you"
              countryFlag="/country-flags/svg/us.svg"
              notification="Hello"
              username="John - 24"
              screen={isMobile ? 'mobile' : isTabletMini ? 'tablet' : 'desktop'}
              country="United States"
              matches="5/7 interests matched"
              userImage="/John.jpeg"
              userBio="Hi I am John, a 24-year-old from United States with a love for drawing and a passion for adventure"
              caption="Did you know John has read 20 books last year 📖 🙂"
            />
          )}
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
                        (Between 18 to 25)
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
                              max={25}
                              min={18}
                              value={field.value}
                              step={1}
                              onValueChange={field.onChange}
                            />
                            <Typography variant={'body'} weight={'medium'}>
                              25
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
                size={'md'}
                className="w-full bg-primary-50 mt-14"
              >
                Search
              </Button>
            </form>
          </Form>
        </div>
        {isDesktopOrLaptop && (
          <div className={`order-1`}>
            <ProfileNotification
              heading="We have a match for you"
              countryFlag="/country-flags/svg/us.svg"
              notification="Hello"
              username="John - 24"
              screen={isMobile ? 'mobile' : isTabletMini ? 'tablet' : 'desktop'}
              country="United States"
              matches="5/7 interests matched"
              userImage="/John.jpeg"
              userBio="Hi I am John, a 24-year-old from United States with a love for drawing and a passion for adventure"
              caption="Did you know John has read 20 books last year 📖 🙂"
            />
          </div>
        )}
      </div>
    </>
  );
};
