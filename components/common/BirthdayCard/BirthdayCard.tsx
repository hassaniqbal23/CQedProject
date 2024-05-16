import React from 'react'
import { Typography } from '../Typography/Typography'
import { Avatar, AvatarImage, Button } from '@/components/ui'
import Image from 'next/image'

interface IBirthdayCardProps {
    name: string;
    birthDate: string;
    profile: string;
    buttonText: string;
    showWishButton: boolean
}

function BirthdayCard({ name, birthDate, profile, showWishButton, buttonText }: IBirthdayCardProps) {
    return (
        <div className='flex justify-between items-center p-2' >
            <div className='flex items-center gap-2' >
                <Avatar className="w-16 h-16 md:w-54 md:h-54 mr-2 rounded-full bg-lightgray  ">
                    <AvatarImage src={profile} alt="students profile" />
                </Avatar>
                <div className='flex flex-col gap-1' >
                    <Typography variant='h5' weight='semibold' >{name}</Typography>
                    <Typography variant='p' weight='regular' className='text-gray-400' >{birthDate}</Typography>
                </div>
            </div>
            {showWishButton && <Button className='rounded-full h-10' >{buttonText}</Button>}
        </div>
    )
}

export default BirthdayCard