import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui';
import { Input } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { AcceptInvite } from '@/app/api/schools';
import { useRouter, useSearchParams } from 'next/navigation';
import BottomNavbar from '@/components/common/navbar/bottomNavbar';
import { Typography } from '../Typography/Typography';

const formSchema = z.object({
  name: z.string().refine((value) => value.trim() !== '', {
    message: 'Please enter your School name',
  }),
  email: z
    .string()
    .email()
    .refine((value) => value.trim() !== '', {
      message: 'Please enter your email address.',
    }),
  phone: z.string().refine((value) => value.trim() !== '', {
    message: 'Please enter your phone number.',
  }),
  country: z.string().refine((value) => value.trim() !== '', {
    message: 'Please select your Country.',
  }),
  state: z.string().refine((value) => value.trim() !== '', {
    message: ' Please select your State.',
  }),
  address: z.string().refine((value) => value.trim() !== '', {
    message: ' Please enter School address.',
  }),
});

export function SchoolDetailsForm() {
  const params = useSearchParams();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      country: '',
      state: '',
      address: '',
    },
  });

  const { mutate: acceptSchoolInvite, isLoading } = useMutation(
    (data: AcceptInvite) => AcceptInvite(data),
    {
      onSuccess: (res) => {
        router.push('/schools/onboarding/update-password');
        form.reset();
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const onSubmit = form.handleSubmit((values, field: any) => {
    console.log(values);
  });

  return (
    <>
      <div className="flex flex-col max-w-3xl mx-auto">
        <div className="flex flex-col justify-center items-center mb-4">
          <Typography variant="h3" weight="bold" className="text-primary mb-2">
            Add your school details
          </Typography>
          <Typography variant="h4" weight="regular" className="text-[#464650] ">
            Create your school profile
          </Typography>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g John, Emma"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email Address and Phone inputs */}
              <div className=" grid md:grid-cols-2 md:gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g example@12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+442" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Country and State inputs */}
              <div className="grid md:grid-cols-2 md:gap-6">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g USA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g California" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* School Address input with width of */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g 123 Main St"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
      <BottomNavbar
        onBackButton={() => {}}
        buttonLoading={isLoading}
        onContinue={async () => {
          let validate = await form.trigger();
          if (validate) {
            const submitedValues = form.getValues();
            acceptSchoolInvite(submitedValues);
          }
        }}
      ></BottomNavbar>
    </>
  );
}
