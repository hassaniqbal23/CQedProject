'use client';
import React, { FC } from 'react';
import Modal from '@/components/common/Modal/Modal';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { EmailInput } from '../From/TagsInput/TagInput';

interface SendEmailProps {
  onSubmit: (data: any) => void;
  open?: boolean;
  setOpen?: (value: boolean) => void;
  inviteButtonTitle?: string;
  inviteLoading?: boolean;
  headerTitle?: string;
}

const emailValidation = (emails: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emails.trim());
};

const schema = z.object({
  emails: z
    .string()
    .array()
    .nonempty({ message: 'Please enter at least 1 email' })
    .refine(
      (emails) => {
        return emails.every((email) => emailValidation(email));
      },
      {
        message: 'Please enter valid email addresses.',
      }
    ),
});

export const SendEmail: FC<SendEmailProps> = ({
  onSubmit,
  open,
  setOpen,
  inviteButtonTitle,
  inviteLoading,
  headerTitle = 'Invite School',
}: SendEmailProps) => {
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: {
      emails: [],
    },
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  return (
    <Modal
      isVisible={open}
      onOpenChange={() => {
        form.reset();
        setOpen && setOpen(false);
      }}
      header={true}
      headerTitle={headerTitle}
      footerOkButton="Invite School"
      showFooterCloseButton={false}
      footer={false}
      onOkClick={() => console.log('ok')}
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1">
            <FormField
              control={form.control}
              name="emails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <EmailInput
                      initialValue={field.value}
                      maxEmails={10}
                      onChange={(value: string[]) => {
                        field.onChange(value);
                      }}
                      placeholder={'Enter emails address'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end mt-6">
              <Button
                size={'md'}
                loading={inviteLoading}
                disabled={inviteLoading}
                type="submit"
              >
                {inviteButtonTitle}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

SendEmail.displayName = 'SendEmail';
