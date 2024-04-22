import React, { useState } from 'react'
import Modal from '@/components/common/Modal/Modal'
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Textarea } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface SendEmailProps {
    onSubmit: (data: any) => void
}

const schema = z.object({
    email: z.string().email('Invalid email format').min(2, 'Name must be at least 2 characters')
});

function SendEmail({ onSubmit }: SendEmailProps) {
    const [error, setError] = useState<string | null>(null);

    const form = useForm<any>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = form;

    return (
        <Modal header={true} headerTitle='Invite School' footerOkButton='Invite School' showFooterCloseButton={false} openModalButton={<Button>Open Send Email</Button>} footer={true} >
            <Form  {...form}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(onSubmit)(e);
                    }}
                >
                    <div className="mb-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mb-2">
                                        Email
                                    </FormLabel>
                                    <FormControl className="mb-6">
                                        <Textarea
                                            placeholder="Enter your Email or Username!"
                                            {...field}
                                            {...register('name')}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {error && (
                        <div>
                            <FormMessage>{error}</FormMessage>
                        </div>
                    )}
                </form>
            </Form>
        </Modal>
    )
}

export default SendEmail
