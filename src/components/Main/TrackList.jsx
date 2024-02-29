import React, { useEffect, useState } from 'react'
import TrackFiles from '../sharedComponents/TrackFiles';


export default function TrackList({individs,populateMaindisplay,switchMode,setIsPlayed,isplayed}) {
  const [tracks, setTrack] = useState({});

  const token = localStorage.getItem('access_token');
  // console.log("this reponse",individs);
     
  function millisecondsToMinutes(milliseconds) {
    if (typeof milliseconds !== 'number' || isNaN(milliseconds)) {
      return 'Invalid duration';
    }
    const totalSeconds = milliseconds / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
    return formattedTime;
  }
  useEffect(()=>{
    const bumboclact =async()=>{
      
      const sup = await getTrack(individs[0]?.track?.id);
      setIsPlayed(true);
    }
    bumboclact()
  },[individs])

  const getTrack =(id)=>{
    let TrackObj = [];
    const mainIndividualPlaylist= individs.find((individ)=> individ?.track?.id === id);
    TrackObj.push(mainIndividualPlaylist);
    populateMaindisplay(TrackObj);
    setIsPlayed(true);
  }

  return (
    <div className={switchMode ? "bg-white" : "bg-black"}>
        <div className='px-4 py-2'>
          <div className='flex flex-col pb-10'>
            <h2 className='text-green-500 text-lg font-sans font-poppins font-semibold leading-5 break-words'>
              TRACK LIST
            </h2>
           
          </div>
          <div>
          <p className='text-gray-600 text-base font-sans font-poppins-weight-400 pb-4 leading-4 break-words capitalize'>
              playing next
            </p>
           {individs.map((file)=>(
             <TrackFiles
             key={file?.track?.id}
             id={file?.track?.id}
             img={file?.track?.album?.images[2]?.url}
             artist={file?.track?.artists[0]?.name}
             year={file?.track?.album?.release_date?.split("-")[0]}
             timeDuration={millisecondsToMinutes(file?.track?.duration_ms)}
             title={file?.track?.name}
             onClick={()=>{getTrack(file?.track?.id)}}
             switchMode={switchMode}
             />
           ))}
          </div>
        </div>
    </div>
  )
}

// const result = await fetch(`https://api.spotify.com/v1/tracks/${trackID}`, {
    //   method: "GET",
    //   headers: { Authorization: `Bearer ${token}` },
    // });
    
    // const response = await result.json();
    
    // TrackObj={
    //   name :response?.name,
    //   song: response?.preview_url,
    //   Duration: response?.duration_ms,
    //   images: response?.album?.images[1].url,
    //   artists: response?.artists?.map((artist) =>(artist.name)),
    // };