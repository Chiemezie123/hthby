import React from 'react';
import MiddleImage from "/image/MiddleImage.png";
import CurrentPlay from '../Displaymusic/CurrentPlay';
import AudioPlay from '../Displaymusic/AudioPlay';

export default function MainDisplay({populate,  setPopulate,isplayed,setIsPlayed,individs}) {
  return (
    <div className=' h-full bg-gray-50'>
       <div className='py-4 px-4'>
        <div className='flex justify-center items-center pb-4'>
              <h2 className='text-gray-700 text-xl font-sans font-poppins leading-6'>
              Now playing
              </h2>
          </div>
          <div className='flex justify-center items-center'>
            <CurrentPlay  populate={populate} />
          </div>
          <div>
            <AudioPlay  setPopulate={ setPopulate} individs={individs}   populate={populate}isplayed={isplayed} setIsPlayed={setIsPlayed}/>
          </div>
       </div>
    </div>
  )
}
