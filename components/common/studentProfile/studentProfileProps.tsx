import React from 'react';
// Adjust the path as needed
import ProfileStudent from '@/components/common/studentProfile/studentProfile';
const StudentProfileProps: React.FC = () => {
  return (
    <div className="flex justify-center items-center ">
      <ProfileStudent
        cardtitle="PERSONAL INFO"
        name="arslan"
        email="arslan@gmail.com"
        age={25}
        birthDate="21/12/1999"
        gender="male"
        country="Pakistan"
        address="Gilgit-Baltistan"
        status="Active"
        Schedule="View all schedules"
        studentId="#12458u"
      />
    </div>
  );
};

export default StudentProfileProps;
