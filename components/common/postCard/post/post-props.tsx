import React from 'react';
import { Post } from './post'; // Assuming Post component is defined in 'Post.tsx' or 'Post.js'
import { FC } from 'react';
const PostProps: FC = () => {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <Post
        title = {'Moin’s  posting'}
          key={item} 
         
          userImage={'/assets/profile/profile.svg'}
          attachment={
            item === 1 || item === 3 ? ['/assets/images/img.png'] : []
          }
          userFullName={'Alexander John'}
          username={'alexander john'}
          created_at={'2021-10-10T00:00:00.000Z'}
          description={
            'You can’t buy happiness, but you can get happiness on the beach! This is labuan bajo, Indonesiaa'
          }
          
        />
      ))}
    </>
  );
};

export default PostProps;
