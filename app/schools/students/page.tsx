'use client'

import { useState } from "react";
import { useMutation } from "react-query";
import { Invite } from "@/app/api/invitations";
import { SendEmail } from "@/components/common/SendEmailModal/SendEmailModal";
import { Button } from "@/components/ui";

function SchoolStudents() {
  const [inviteStudentModal, setInviteStudentModal] = useState(false);

  const { mutate: schoolInvite, isLoading } = useMutation(
    (studentData: { emails: string; type: string }) => Invite(studentData),
    {
      onSuccess: (res) => {
        setInviteStudentModal(false);
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const onSubmit = ({ emails }: { emails: string }) => {
    schoolInvite({ emails, type: 'SCHOOL_STUDENT' });
  };

  return <div>
    <div className={'flex mb-2'}>
      <h1>Students</h1>
      <div className={'ml-auto'}>
        <Button onClick={() => setInviteStudentModal(true)}>
          Invite Students
        </Button>
      </div>
    </div>
    <hr />
    <SendEmail
      inviteLoading={isLoading}
      setOpen={setInviteStudentModal}
      open={inviteStudentModal}
      onSubmit={onSubmit}
      inviteButtonTitle={'Invite Students'}
      headerTitle={'Invite Students'}
    />
  </div>;
}

export default SchoolStudents