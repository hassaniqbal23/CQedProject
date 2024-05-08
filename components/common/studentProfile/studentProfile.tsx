import {
  CardContent,
  Card,
  CardTitle,
  CardHeader,
} from '@/components/ui';
import React, { FC } from 'react';

interface IProps {
  cardtitle: string;
  name: string;
  email: string | number;
  age: number;
  birthDate: string | number;
  gender: string;
  country: string;
  address: string;
  status: string;
  Schedule: string;
  studentId: string;
}

const ProfileStudent: FC<IProps> = ({
  name = 'arslan',
  cardtitle = 'PERSONAL INFO',
  email = 'arslan@gmail',
  age = 25,
  birthDate = '21/12/1999',
  gender = 'male',
  country = 'pakistan',
  address = 'gilgit',
  status = 'active',
  Schedule = 'View all schedules',
  studentId = '#1223992',
}: IProps) => {
  return (
    
    <div className="flex flex-col md:flex-row justify-between gap-4 w-full mb-4 ">
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle className="text-[#1B1F37 text-xl">{cardtitle}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 flex justify-between">
            <div className="text-[#1B1F37] font-montserrat font-semibold text-base">
              <p className="mb-3">Name</p>
              <p className="mb-3">Email</p>
              <p className="mb-3">Birthday</p>
              <p className="mb-3">Age</p>
              <p className="mb-3">Gender</p>
              <p className="mb-3">Country</p>
            </div>
            <div className="text-[#1B1F37] font-montserrat text-base ">
              <p className="mb-3">{name}</p>
              <p className="mb-3">{email}</p>
              <p className="mb-3">{birthDate}</p>
              <p className="mb-3">{age}</p>
              <p className="mb-3">{gender}</p>
              <p className="mb-3">{country}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="w-full md:w-1/2 flex-col">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-[#1B1F37] text-xl">Address</CardTitle>
          </CardHeader>

          <div className="flex justify-between">
            <CardContent className="text-[#1B1F37] font-montserrat font-semibold text-base">
              address
            </CardContent>
            <CardContent>{address}</CardContent>
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="#1B1F37 text-xl" > SCHOOL DETAILS</CardTitle>
          </CardHeader>

          <div className="flex justify-between">
            <CardContent className="text-[#1B1F37] font-montserrat font-semibold text-base gap-6">
              <p>status</p>
              <p>Schedule</p>
              <p>Student ID</p>
            </CardContent>
            <CardContent className=" font-montserrat  text-base gap-6">
              <p>{status}</p>
              <p>{Schedule}</p>
              <p>{studentId}</p>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

ProfileStudent.displayName  = 'ProfileStudent'

export default ProfileStudent;
