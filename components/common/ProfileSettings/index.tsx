import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, Input, Card } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera } from 'lucide-react';
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';


const formSchema = z.object({
    fullName: z.string().min(2, {
        message: 'Name must be at least 2 characters',
    }),
    username: z.string().min(5, {
        message: 'username must be at least 5 characters',
    }),
    photo: z.string(),
});

function ProfileSettings() {


    const form = useForm<any>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            password: '',
            photo: '',
        },
    });

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = form;

    return (
        <Card className='w-full p-4 mt-6' >
            <h1 className='text-xl font-bold' >Basic Information</h1>
            <div className='mt-8 flex flex-col items-center w-1/5' >
                <div className='relative' >
                    <Image src={'https://s3-alpha-sig.figma.com/img/5bdf/b719/b248f47e16db4f0b1de054e692fc0345?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RRyfe9tfplIcAoeFC2z6t1NtpuOf9hYzsEQQXGr~blZCOTCFex8Ul4WkIzFbQIGrZ92S869Wmi9onG3T5u5N~IRptJPqNDmypfpWyo7KWL8nMDswFy~cZ-irxkq4hEI1MFPqIiosBfsCuPM1xtnKWzuahXTQBD3FJUwqTYLjBFmyzDMJB7ToauZItBNuV-kdUl5EpCECcnduE2z9EsGpO2NOwGjdYg~u4Q5PjnQMOmut2jOE9lnoHQ2zZ5suNmlgRA~pYlfMAbTdgMvXx9fEWs1x5pfuYtayNil55Tqwen2i7OeUrA5qoPwDRQjCPUhvjouoQWIp2g5YtN3FYNCXpA__'} alt='user image' width={200} height={200} className='rounded-full' />
                    <div className='absolute p-2 bg-white border right-1 bottom-4 rounded-full cursor-pointer' >
                        <Camera />
                    </div>
                </div>
                <h2 className='mt-2 font-semibold' >Choose your avatar</h2>
            </div>
            <div>
                <Form {...form}>
                    <form className='grid grid-cols-2 gap-5 mt-10' >
                        <FormField
                            name='fullName'
                            control={form.control}
                            render={({ field }) => {
                                return <FormItem>
                                    <FormLabel className="mb-2">
                                        Full Name
                                    </FormLabel>
                                    <FormControl className="mb-6">
                                        <Input
                                            placeholder="Enter your Email or Username!"
                                            {...field}
                                            {...register('fullName')}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }}
                        />
                        <FormField
                            name='username'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mb-2">
                                        Username
                                    </FormLabel>
                                    <FormControl className="mb-6">
                                        <Input
                                            placeholder="Enter your Username!"
                                            {...field}
                                            {...register('username')}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
        </Card>
    )
}

export default ProfileSettings
