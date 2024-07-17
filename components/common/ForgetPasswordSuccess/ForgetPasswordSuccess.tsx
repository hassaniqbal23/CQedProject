'use client';

import { Button } from '@/components/ui';
import Link from 'next/link';

interface ForgetPasswordSuccessProps {
  title?: string;
  description?: string;
  backLink: string;
}

function ForgetPasswordSuccess(props: ForgetPasswordSuccessProps) {
  const {
    title = 'Password Reset Email Sent',
    description = `We have  sent We've sent an email with instructions to reset your password`,
  } = props;
  return (
    <div className={'text-center'}>
      <h2 className={'text-[30px] mb-3'}>{title}</h2>
      <p className={'text-[14px] mb-3'}>{description}</p>
      <Link href={props.backLink}>
        <Button>Go Back</Button>
      </Link>
    </div>
  );
}

export { ForgetPasswordSuccess };
