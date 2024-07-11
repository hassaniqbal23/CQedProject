'use client';

import { deleteUser } from '@/app/api/admin';
import { Dropdown } from '@/components/ui';
import DataTable from '@/components/ui/table/table';
import Image from 'next/image';
import React, { useState } from 'react';
import { IoEllipsisVertical } from 'react-icons/io5';
import { useMutation, useQueryClient } from 'react-query';
import { getSingleCountry } from '@/lib/utils';
import { toast } from 'sonner';


export interface UsersTableProps {
    data: any;
    noDataMessage?: string;
    loading?: boolean;
}

function UsersTable(props: UsersTableProps) {
    const queryClient = useQueryClient();
    const { data, noDataMessage, loading } = props;
    const [selectedUser, setSelectedUser] = useState<{
        id: number | null;
    }>({
        id: null,
    });
    const { id } = selectedUser;

    const { mutate: deleteUserApi, isLoading } = useMutation(
        (id: number) => deleteUser(id),
        {
            onSuccess: (res) => {
                toast.success(`${res.data.message}`, {
                    position: 'bottom-center',
                });
                queryClient.invalidateQueries('getAllUsers');
            },
            onError(error) {
                console.log(error);
            },
        }
    );
    return (
        <div className="w-full">
            <DataTable
                data={data && data.data}
                noDataMessage={noDataMessage || 'No Users'}
                loading={loading}
                columns={[
                    {
                        label: 'Name',
                        key: 'name',
                        className: 'w-1/6',
                        render: (data) => {
                            return (
                                <div className="flex items-center gap-2 w-full">
                                    <Image
                                        src={
                                            data.attachment?.file_path ||
                                            '/assets/profile/profile.svg'
                                        }
                                        alt={data?.attachment?.id || ''}
                                        width={30}
                                        height={30}
                                        className="rounded-full w-[30px] h-[30px] object-cover"
                                    />
                                    <h2>{data.name}</h2>
                                </div>
                            );
                        },
                    },
                    {
                        label: 'Email Address',
                        key: 'email',
                        className: 'w-1/6',
                        render(data) {
                            return <div>{data?.email}</div>;
                        },
                    },
                    {
                        label: 'School Name',
                        key: 'school.name',
                        className: 'w-1/6',
                        render(data) {
                            return <div>{data?.school?.name}</div>;
                        },
                    },
                    {
                        label: 'Country',
                        key: 'country',
                        className: 'w-1/6',
                        render(data) {
                            const country = getSingleCountry(data?.profile?.country);
                            return <div>{country.label}</div>;
                        },
                    },
                    {
                        label: 'Actions',
                        key: 'actions',
                        className: 'w-1/6',
                        render: (data) => {
                            return (
                                <div className="w-10 justify-center flex">
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
                                                            deleteUserApi(data.id)
                                                        }
                                                    >
                                                        Delete User
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
            />
        </div>
    );
}

export default UsersTable;
