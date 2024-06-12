'use client';
import React, { useState } from 'react';
import SchoolTable from '@/components/common/SchoolsTable';
import {
  Button,
  Dropdown,
  Input,
  TabsComponent as Tabs,
} from '@/components/ui';
import { SendEmail } from '@/components/index';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Invite } from '@/app/api/invitations';
import DataTable from '@/components/ui/table/table';
import Pagination from '@/components/common/pagination/pagination';
import {
  InvitationType,
  deleteInvitation,
  getAllSchools,
  getInvites,
  resendInvitation,
} from '@/app/api/admin';
import { toast } from 'sonner';
import { CircleAlert, Plus } from 'lucide-react';
import { Typography } from '@/components/common/Typography/Typography';
import { IoEllipsisVertical } from 'react-icons/io5';
import Delete from '@/components/common/DeleteAlert/DeleteAlert';

const Universities = () => {
  const queryClent = useQueryClient();
  const [paginationSchools, setPaginationSchools] = useState<{
    schoolPage: number;
    schoolLimit: number;
  }>({
    schoolPage: 1,
    schoolLimit: 10,
  });

  const [paginationInviteSchool, setPaginationInviteSchool] = useState<{
    schoolInvitePage: number;
    schoolInviteLimit: number;
  }>({
    schoolInvitePage: 1,
    schoolInviteLimit: 10,
  });

  const { schoolPage, schoolLimit } = paginationSchools;
  const { schoolInvitePage, schoolInviteLimit } = paginationInviteSchool;

  const [totalCountSchool, setTotalCountSchool] = useState<number>(1);
  const [totalCountInviteSchool, setTotalCountInviteSchool] =
    useState<number>(1);
  const [inviteSchool, setInviteSchool] = useState(false);
  const [selectDeleteModal, setSelectDeleteModal] = useState<{
    id: number | null;
    openDelete: boolean;
  }>({
    id: null,
    openDelete: false,
  });

  const { data, isLoading } = useQuery(
    ['getInvitedSchools', schoolPage, schoolLimit],
    () => getAllSchools(schoolPage, schoolLimit),
    {
      enabled: true,
      onSuccess: (res) => {
        setTotalCountSchool(res?.data?.totalCount);
      },
      onError(err) {
        console.log(err);
      },
    }
  );

  const {
    data: invitedSchools,
    isLoading: invitedSchoolsLoading,
    refetch: inviteRefetch,
  } = useQuery(['getInvites', schoolInvitePage, schoolInviteLimit], () =>
    getInvites(schoolInvitePage, schoolInviteLimit, InvitationType.SCHOOL)
  );

  const { mutate: schoolInvite, isLoading: inviteLoading } = useMutation(
    (userData: { emails: string; type: string }) => Invite(userData),
    {
      onSuccess: (res) => {
        queryClent.invalidateQueries('getInvites');
        toast.success(`${res.data.message}`, {
          position: 'bottom-center',
          icon: <CircleAlert />,
          closeButton: true,
        });
        setTotalCountInviteSchool(res?.data?.totalCount);
        setInviteSchool(false);
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const { mutate: reInviteSchool, isLoading: reInviteLoading } = useMutation(
    (userData: { email: string; type: string }) => resendInvitation(userData),
    {
      onSuccess: (res) => {
        toast.success(`${res.data.message}`, {
          position: 'bottom-center',
          icon: <CircleAlert />,
          closeButton: true,
        });
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const { mutate: removeInviteSchool, isLoading: removeInviteLoading } =
    useMutation((id: number) => deleteInvitation(id), {
      onSuccess: (res) => {
        setSelectDeleteModal({
          id: null,
          openDelete: false,
        });
        toast.success(`${res.data.message}`, {
          position: 'bottom-center',
          icon: <CircleAlert />,
          closeButton: true,
        });
        inviteRefetch();
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    });

  const onSubmit = ({ emails }: { emails: string }) => {
    schoolInvite({ emails, type: 'SCHOOL' });
  };

  const handleInvitePageChange = (pageNumber: number) => {
    setPaginationInviteSchool((prev) => ({
      ...prev,
      schoolInvitePage: pageNumber,
    }));
  };

  return (
    <>
      <div className="w-full py-3 mt-7">
        <div className="w-full flex mb-4 items-center">
          <div>
            <Typography variant="h3" weight="semibold">
              Universities
            </Typography>
            <Typography variant="p" weight="regular">
              Your universities are listed below
            </Typography>
          </div>
          <div className={'ml-auto'}>
            <Button
              icon={<Plus size={25} />}
              iconPosition="left"
              size={'md'}
              onClick={() => setInviteSchool(true)}
            >
              Add University
            </Button>
          </div>
        </div>
        <Tabs
          defaultValue={'universities'}
          tabs={[
            {
              label: 'Added Universities',
              value: 'universities',
            },
            {
              label: 'Invited Universities',
              value: 'invited',
            },
          ]}
          variant={'secondary'}
          tabContent={[
            {
              value: 'universities',
              content: (
                <>
                  <div className="py-8">
                    <Input
                      placeholder="Search universities here..."
                      type="search"
                      className=" max-w-sm  text-black rounded-full text"
                    />
                  </div>
                  <div>
                    <SchoolTable
                      data={data?.data?.data || []}
                      loading={isLoading}
                    />
                    <div className={'flex justify-end w-full mt-4'}>
                      <Pagination
                        currentPage={schoolPage}
                        totalPages={Math.ceil(totalCountSchool / schoolLimit)}
                        pageSize={schoolLimit}
                        onPageChange={(value: number) => {
                          setPaginationSchools((prev) => ({
                            ...prev,
                            schoolPage: value,
                          }));
                        }}
                        totalCount={totalCountSchool}
                        setPageSize={(pageSize) =>
                          setPaginationSchools((prev) => ({
                            ...prev,
                            schoolLimit: pageSize,
                          }))
                        }
                      />
                    </div>
                  </div>
                </>
              ),
            },
            {
              value: 'invited',
              content: (
                <>
                  <div className="py-8">
                    <Input
                      placeholder="Search universities here..."
                      type="search"
                      className=" max-w-sm  text-black rounded-full text"
                    />
                  </div>
                  <div>
                    <DataTable
                      columns={[
                        {
                          label: 'University Email',
                          key: 'email',
                          className: 'pl-7',
                          render: (data) => (
                            <div className="pl-2">{data['email']} </div>
                          ),
                        },
                        {
                          label: 'Actions',
                          key: 'actions',
                          className: 'flex justify-end items-center pr-7',
                          render: (data) => {
                            return (
                              <div className=" flex justify-end pr-7">
                                <Dropdown
                                  trigger={
                                    <div>
                                      <IoEllipsisVertical className="cursor-pointer" />
                                    </div>
                                  }
                                  options={[
                                    {
                                      content: (
                                        <div
                                          onClick={() =>
                                            reInviteSchool({
                                              email: data.email,
                                              type: 'SCHOOL',
                                            })
                                          }
                                        >
                                          Resend Invite
                                        </div>
                                      ),
                                    },
                                    {
                                      content: (
                                        <div
                                          onClick={() =>
                                            setSelectDeleteModal({
                                              id: data.id,
                                              openDelete: true,
                                            })
                                          }
                                        >
                                          Remove Invite
                                        </div>
                                      ),
                                    },
                                  ]}
                                />
                              </div>
                            );
                          },
                        },
                      ]}
                      data={invitedSchools?.data?.data || []}
                      loading={invitedSchoolsLoading}
                    />
                    <div className={'flex justify-end w-full mt-4'}>
                      <Pagination
                        currentPage={schoolInvitePage}
                        totalPages={Math.ceil(
                          totalCountInviteSchool / schoolInviteLimit
                        )}
                        pageSize={schoolLimit}
                        onPageChange={handleInvitePageChange}
                        totalCount={totalCountSchool}
                        setPageSize={(pageSize) =>
                          setPaginationInviteSchool((prev) => ({
                            ...prev,
                            schoolInviteLimit: pageSize,
                          }))
                        }
                      />
                    </div>
                  </div>
                </>
              ),
            },
          ]}
          onValueChange={() => {}}
        ></Tabs>
      </div>
      <Delete
        isButtonLoading={removeInviteLoading}
        isVisible={selectDeleteModal.openDelete}
        onClose={() => {
          setSelectDeleteModal({
            id: null,
            openDelete: false,
          });
        }}
        onConfirm={() => {
          if (selectDeleteModal.id) {
            removeInviteSchool(selectDeleteModal.id);
          }
        }}
      />
      <SendEmail
        inviteLoading={inviteLoading}
        setOpen={setInviteSchool}
        open={inviteSchool}
        onSubmit={onSubmit}
        inviteButtonTitle={'Invite University'}
      />
    </>
  );
};

export default Universities;
