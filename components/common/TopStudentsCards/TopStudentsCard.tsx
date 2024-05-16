import { Avatar, AvatarImage, Badge } from '@/components/ui'
import React from 'react'
import { Typography } from '../Typography/Typography'

interface ITopStudentsCard {
    name: string;
    proficiency: 'Basic' | "Intermediate" | "Proficient" | "Advanced";
    buttonText: string;
    profile: string;
}

function TopStudentsCard({ name, buttonText, proficiency, profile }: ITopStudentsCard) {
    return (
        <div className='flex justify-between items-center p-2' >
            <div className='flex items-center gap-2' >
                <Avatar className="w-16 h-16 md:w-54 md:h-54 mr-2 rounded-full bg-lightgray  ">
                    <AvatarImage src={profile} alt="students profile" />
                </Avatar>
                <div className='flex flex-col gap-1' >
                    <Typography variant='h5' weight='semibold' >{name}</Typography>
                    <Typography variant='p' weight='regular' className={`${proficiency === 'Basic' ? 'text-yellow-500' : proficiency === 'Advanced' ? "text-blue-500" : proficiency === 'Intermediate' ? 'text-green-500' : "text-red-400"}`} >{proficiency}</Typography>
                </div>
            </div>
            <Badge className={`border font-semibold cursor-pointer ${proficiency === 'Basic' ? 'text-yellow-500 bg-[#FFF4EB] border-yellow-500' : proficiency === 'Advanced' ? "text-blue-500 bg-[#EAF8FF] border-blue-500" : proficiency === 'Intermediate' ? 'text-green-500 bg-[#EDFBE9] border-green-500' : "text-red-400 bg-[#FFE4E4] border-red-400"} h-10`} >{buttonText}</Badge>
        </div>
    )
}

export default TopStudentsCard