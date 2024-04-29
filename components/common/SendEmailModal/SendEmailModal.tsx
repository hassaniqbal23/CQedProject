'use client';
import React, { FC, useState } from 'react';
import Modal from '@/components/common/Modal/Modal';
import { Button, Form } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormTextArea } from '../From/FormTextArea';

interface SendEmailProps {
  onSubmit: (data: any) => void;
  open?: boolean;
  setOpen?: (value: boolean) => void;
  inviteButtonTitle?: string;
  inviteLoading?: boolean;
}

const emailValidation = (emails: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emails.trim());
};

const schema = z.object({
  emails: z
    .string()
    .nonempty({ message: 'Please enter at least 1 email' })
    .refine(
      (value) => {
        const emails = value.split(',').map((email) => email.trim());
        return emails.every(emailValidation);
      },
      {
        message: 'Please enter valid email addresses, separated by commas.',
      }
    ),
});

export const SendEmail: FC<SendEmailProps> = ({
  onSubmit,
  open,
  setOpen,
  inviteButtonTitle,
  inviteLoading,
}: SendEmailProps) => {
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: {
      emails: '',
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
      headerTitle="Invite School"
      footerOkButton="Invite School"
      showFooterCloseButton={false}
      footer={false}
      onOkClick={() => console.log('ok')}
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <FormTextArea
              form={form}
              placeholder="Enter emails address"
              name="emails"
              label="Email"
            />
            <div className="flex justify-end mt-6">
              <Button
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
