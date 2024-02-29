import React from 'react';

export default function TrackFiles({img,title,id,timeDuration,year,artist,logo,onClick,switchMode}) {
  

  return (
    <div
     className='flex flex-row  items-center py-2 gap-0.5  hover: cursor-pointer hover:border-b-2 hover: border-gray-500'
     onClick={onClick}
     key={id}
     >
        <div className=' flex flex-row items-center'>
           {logo && <img src={logo} alt={title}/>}
           <img src={img} alt={title} className='rounded-sm'/> 
        </div>
        <div className=' flex flex-col flex-1 '>
            <div className='flex flex-row items-center justify-between flex-1 py-3'>
            <h2 className={`${switchMode ? 'text-black-500' : 'text-green-500'} text-sm font-sans font-poppins font-weight-800 leading-5 break-words capitalize`}>{title}</h2>
                <h2 className={`${switchMode ? 'text-black-500' : 'text-green-500'}  text-sm font-sans font-poppins font-weight-800 leading-5 break-words`}>{timeDuration}</h2>
            </div>
            <div className='flex flex-row items-center justify-between '>
                <p className={`${switchMode ? 'text-white-200':"text-gray-200"} text-xs font-sans font-poppins-weight-400 leading-4 break-words capitalize`}>{artist}</p>
                <p className={`${switchMode ? 'text-white-200':"text-gray-200"} text-xs font-sans font-poppins font-weight-400 leading-4 break-words capitalize`}>{year}</p>
            </div>
        </div>
    </div>
  )
}
