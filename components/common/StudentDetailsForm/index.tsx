import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Dropdown,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui';
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui';
import { useForm, SubmitHandler } from 'react-hook-form';
import Progressbar from '../Progressbar/Progressbar';
import DatePicker from '@/components/ui/date-picker/date-picker';
import ChipSelector from '@/components/ui/ChipSelect/ChipSelector';
import { CreateStudentUser, LoginAPI } from '@/app/api/auth';
import BottomNavbar from '../navbar/bottomNavbar';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { storeUserId } from '@/app/utils/encryption';

const formSchema = z.object({
    fullName: z.string().refine((value) => value.trim() !== '', {
        message: 'Please enter your Full name',
    }),
    nickName: z
        .string()
        .refine((value) => value.trim() !== '', {
            message: 'Please enter your Nickname.',
        }),
    birthday: z.date()
        .refine((value) => !isNaN(value.getTime()), {
            message: "Please select a valid date.",
        })
        .transform((value) => (isNaN(value.getTime()) ? null : value)),
    country: z.string().refine((value) => value.trim() !== '', {
        message: 'Please select your Country.',
    }),
    gender: z.string().refine((value) => value.trim() !== '', {
        message: ' Please select your Gender.',
    }),
    language: z.array(z.object({
        label: z.string(),
        value: z.string(),
        flagUrl: z.string(),
        altName: z.string(),
    }).optional()).refine((value) => value.length > 0 ? true : false, {
        message: 'Please Select one language.',
    }),
});



function StudentsDetailsFrom() {
    const router = useRouter()
    const params = useSearchParams()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: '',
            nickName: '',
            country: '',
            gender: '',
            language: [],
        },
    });

    const { mutate: createStudents, isLoading } = useMutation(
        (studentsData: any) => CreateStudentUser({ ...studentsData, inviteToken: params?.get('token') }),
        {
            onSuccess: (res) => {
                toast.success(res.data.message);
                const response = res.data.result;
                router.push('/student/onboarding/user-bio');
                storeUserId(response?.user?.id);
                form.reset();
            },
            onError: (error: any) => {
                console.log(error, 'Error =====> log');
            },
        }
    );

    const onSubmit: SubmitHandler<any> = form.handleSubmit(async (values) => {
        createStudents(values)
    });


    return (
        <>
            <div className="flex flex-col max-w-3xl mx-auto mt-8 mb-8">
                <div className='my-8' ><Progressbar heading='Get Started' percentage={20} /></div>
                <div className="flex flex-col justify-center items-center mb-4">
                    <h1 className="text-primary font-bold text-2xl">
                        Let’s get started with creating your profile
                    </h1>
                    <h3 className="font-semibold text-[#a3adbc] text-[17px] ">
                        Learn, grow, and thrive on a global scale!
                    </h3>
                </div>
                <div>
                    <Form {...form}>
                        <form onSubmit={onSubmit} className="space-y-6">
                            <div className=" grid md:grid-cols-2 md:gap-6">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full name</FormLabel>
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
                                <FormField
                                    control={form.control}
                                    name="nickName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Set a Nickname</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g example@12" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className=" grid md:grid-cols-2 md:gap-6">
                                <FormField
                                    control={form.control}
                                    name="birthday"
                                    render={({ field }) => (
                                        <FormItem className='flex flex-col gap-1' >
                                            <FormLabel>Birthday</FormLabel>
                                            <FormControl>
                                                <DatePicker selectDate={(data: any) => {
                                                    form.setValue('birthday', data)
                                                }} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Country</FormLabel>
                                            <FormControl>
                                                <Dropdown label='Country' options={[
                                                    {
                                                        label: 'India',
                                                        value: 'india',
                                                        flagUrl: '/countries/india.svg',
                                                        altName: 'flag india',
                                                    },
                                                    {
                                                        label: 'Pakistan',
                                                        value: 'pakistan',
                                                        flagUrl: '/countries/pakistan.svg',
                                                        altName: 'flag pakistan ',
                                                    },
                                                    {
                                                        label: 'UK',
                                                        value: 'uk',
                                                        flagUrl: '/countries/uk.svg',
                                                        altName: 'flag uk',
                                                    },
                                                ]}
                                                    onChange={(value: any) => {
                                                        console.log(value)
                                                        form.setValue('country', value.value)
                                                    }}
                                                    value={field.value}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Gender</FormLabel>
                                            <FormControl>
                                                <ChipSelector onChange={(data) => form.setValue('gender', data)} options={[
                                                    {
                                                        label: 'Male',
                                                        value: 'Male',
                                                        render: (data: any) => <div className='w-24 text-sm' >{data.label}</div>,
                                                    },
                                                    {
                                                        label: 'Female',
                                                        value: 'Female',
                                                        render: (data: any) => <div className='w-24 text-sm' >{data.label}</div>,
                                                    },
                                                    {
                                                        label: 'Non-binary',
                                                        value: 'Non-binary',
                                                        render: (data: any) => <div className='w-24 text-sm' >{data.label}</div>,
                                                    }]} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="language"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Language</FormLabel>
                                            <FormControl>
                                                <Dropdown label='Language' multSelect={true} options={[
                                                    {
                                                        label: 'Hindi',
                                                        value: 'hindi',
                                                        flagUrl: '/countries/india.svg',
                                                        altName: 'flag india',
                                                    },
                                                    {
                                                        label: 'Urdu',
                                                        value: 'urdu',
                                                        flagUrl: '/countries/pakistan.svg',
                                                        altName: 'flag pakistan ',
                                                    },
                                                    {
                                                        label: 'English(UK)',
                                                        value: 'english(uk)',
                                                        flagUrl: '/countries/uk.svg',
                                                        altName: 'flag uk',
                                                    },
                                                    {
                                                        label: 'English(US)',
                                                        value: 'english(us)',
                                                        flagUrl: '/countries/uk.svg',
                                                        altName: 'flag uk',
                                                    },
                                                ]}
                                                    onChange={(value: any) => {
                                                        form.setValue('language', value)
                                                    }}
                                                    value={field.value as any[]}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
            <BottomNavbar
                isBackButton={false}
                onContinue={() => {
                    onSubmit(form.getValues())
                }}
            ></BottomNavbar>
        </>
    )
}

export default StudentsDetailsFrom