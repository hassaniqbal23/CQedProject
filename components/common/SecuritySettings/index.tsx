import React from 'react'
import { Button, Card, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '../../ui'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


const formSchema = z.object({
    currentPassword: z.string().min(2, {
        message: 'Name must be at least 2 characters',
    }),
    newPassword: z.string().min(5, {
        message: 'username must be at least 5 characters',
    }),
    confirmPassword: z.string(),
});

function SecuritySettings() {
    const form = useForm<any>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confitmPassword: ''
        },
    });

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = form;

    return (
        <Card className='w-full p-4' >
            <h2 className='text-lg font-bold'>Change Password</h2>
            <div className='sm:w-1/2 mt-8' >
                <Form {...form}>
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                    }} >
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
                                            placeholder="Enter Current Password"
                                            {...field}
                                            {...register('fullName')}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }}
                        />
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
                                            placeholder="Enter New Password"
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
                                            placeholder="Confirm Password"
                                            {...field}
                                            {...register('username')}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='mt-4 ' >
                            <Button className='w-full' type='submit' >Reset Password</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Card>
    )
}

export default SecuritySettings