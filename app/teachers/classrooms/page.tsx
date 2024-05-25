'use client';
import ClassRoomHeader from '@/components/common/TeacherClassroomBanner/TeacherClassroomBanner';
import CreateClassRoom from '@/components/common/TeacherCreateClassRoom/TeacherCreateClassRoom';
import { Typography } from '@/components/common/Typography/Typography';
import { ClassroomCard } from '@/components/ui/ClassroomCard/ClassroomCard';
import { Button } from '@/components/ui/button/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function TeacherClassRooms() {
  const [classData, setClassData] = useState([]);
  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <Typography
          variant={'h3'}
          weight={'bold'}
          className="text-center md:text-left mb-4 md:mb-0"
        >
          Your Classrooms
        </Typography>
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <Link
            href={''}
            className="text-primary-500 underline font-medium text-center md:text-left"
          >
            Learn about classrooms
          </Link>
          <Button variant={'default'} className="w-full md:w-48">
            <Plus size={18} className="mr-2" />
            New Class
          </Button>
        </div>
      </div>

      <div className="flex flex-col">
        <div>
          <ClassRoomHeader
            title="Welcome to Classrooms"
            description="Your Virtual CQED where you can help and engage with students"
          />
        </div>
        {classData.length > 0 ? (
          <div className="flex flex-row gap-4 mt-4 flex-wrap">
            {classData.map((classroom, index) => (
              <ClassroomCard
                key={index}
                title={''}
                studentCount={''}
                buttonText={'View Class'}
                buttonOnClick={() => {
                  // Implement button click functionality here
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center mt-10 md:mt-20 lg:mt-36">
            <CreateClassRoom title="Create your CQED Classroom" />
          </div>
        )}
      </div>
    </div>
  );
}
