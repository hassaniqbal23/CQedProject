import React from 'react';
import StudentGroups from './studentGroups'; // Adjust the path as needed

const StudentGruopProps: React.FC = () => {
  return (
    <div className="flex justify-center items-center ">
      <StudentGroups
        imageUrl="/Rectangle.png"
        heading="Sharing your culture education"
        description="Welcome to a place from where you can share and learn about different cultures."
        memebers="5k Members"
        title="Moin’s Joined Groups"
      />
    </div>
  );
};

export default StudentGruopProps;
