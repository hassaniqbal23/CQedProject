import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ResetPasswordContent } from './(component)/ResetPasswordContent';

export const metadata: Metadata = {
  title: 'Reset Password  - GCED',
  description: 'Reset Password  - GCED',
  icons: '/favi.png',
};

const ResetPassword = () => {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPassword;
