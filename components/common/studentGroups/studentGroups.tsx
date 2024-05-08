// components/Card.tsx

import { title } from 'process';
import React from 'react';

interface CardProps {
  imageUrl: string;
  heading: string;
  description: string;
  memebers:string;
  title: string;
}

const Card: React.FC<CardProps> = ({ imageUrl='/Rectangle.png', heading='Sharing your culture education', description='fgnfdknksdnkjsdnnbd', memebers='5k Members' ,title='Moin’s Joined Groups'}) => {
  return (
    <div>
      <h1 className='text-black font-montserrat font-semibold text-2xl mb-5'>{title}</h1>
      <div className="sm:flex justify-around items-center">
     
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  <div className="w-full rounded overflow-hidden shadow-lg">
    <img className="w-full" src={imageUrl} alt="Card" />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{heading}</div>
      <h2>{memebers}</h2>
      <p className="text-gray-700 text-base">{description}</p>
    </div>
    
  </div>
  <div className="w-full rounded overflow-hidden shadow-lg">
    <img className="w-full" src={imageUrl} alt="Card" />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{heading}</div>
      <h2>{memebers}</h2>
      <p className="text-gray-700 text-base">{description}</p>
    </div>
    
  </div>
  <div className="w-full rounded overflow-hidden shadow-lg">
    <img className="w-full" src={imageUrl} alt="Card" />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{heading}</div>
      <h2>{memebers}</h2>
      <p className="text-gray-700 text-base">{description}</p>
    </div>
    
  </div>
  </div>
  </div></div>
    
  );
};

export default Card;


