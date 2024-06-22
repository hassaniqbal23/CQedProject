import React from 'react';
import { Post } from '@/components/common/Post/Post';

const TeacherProfileFeeds = () => {
  return (
    <div className="flex">
      <div className="w-full px-2 gap-10">
        <div className="mt-6">
          {[0, 1].map((_, index) => (
            <div key={index} className="mb-4 gap-2 border shadow-sm rounded-lg">
              <Post
                userImage={'/teacherIcon.svg'}
                userFullName={'Johanes Stim'}
                username={'Johanes Stim'}
                created_at={'2021-10'}
                description={
                  'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
                }
                attachment={'/assets/images/img.png'}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileFeeds;
