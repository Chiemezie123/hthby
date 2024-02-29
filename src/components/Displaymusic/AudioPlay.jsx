import React, { useState ,useRef,useEffect} from "react";
import reverse from "/image/reverse.svg";
import forward from "/image/forward.svg";
import play from "/image/play-svgrepo-com.svg";
import pause from "/image/pause-circle-svgrepo-com.svg";
import shuffle from "/image/shuffler.svg";
import replay from "/image/replay.svg";

export default function AudioPlay({  setPopulate,populate, isplayed,
  setIsPlayed,individs }) {
  const [songInfo, setSongInfo] = useState({
    currentTime: 0, 
    duration: 0,
    animationPercentage: 0,
  });

  const audioRef = useRef(null); 


  const dragHandler = (e) => { 
		audioRef.current.currentTime = e.target.value; 
		setSongInfo({ ...songInfo, currentTime: e.target.value }); 
	}; 

  const FastForward=()=>{
    const popMainID = populate[0].track.id;
    const GetCurrentSongIndex = individs.findIndex((ind) => ind.track.id === popMainID);
    if(GetCurrentSongIndex === individs.length -1){
     return setPopulate((pop)=>([individs[0]]))
    }else{
      setPopulate((pop)=>([individs[GetCurrentSongIndex +1]])); 
    return 
}

}

const reversal =()=>{
  const popMainID = populate[0].track.id;
  const GetCurrentSongIndex = individs.findIndex((ind) => ind.track.id === popMainID);
  if(GetCurrentSongIndex === 0){
    setPopulate((pop)=>([individs[individs.length - 1]]))
    
  }else{
    
    setPopulate((pop)=>([individs[GetCurrentSongIndex -1]]))
  }
}
const playSongHandler = () => { 
  if (isplayed) { 
    audioRef.current.pause(); 
    setIsPlayed(false); 
  
  } else if(!isplayed){ 
    audioRef.current.play(); 
    setIsPlayed(true)
  } 
}; 

function millisecondsToMinutes(milliseconds) {
  if (typeof milliseconds !== "number" || isNaN(milliseconds)) {
    return "Invalid duration";
  }
  const totalSeconds = milliseconds / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  
  return formattedTime;
}

const timeUpdateHandler = (e) => {
  const current = e.target.currentTime;
  const duration = e.target.duration;
  const roundedCurrent = Math.round(current);
  const roundedDuration = Math.round(duration);
  const animation = Math.round((roundedCurrent / roundedDuration) * 100);
  setSongInfo({
    currentTime: current,
    duration,
    animationPercentage: animation,
  });
};

const songEndHandler =()=>{
  setIsPlayed(false);
}


useEffect(()=>{
   let mounted  = true;
   if(mounted){
    
     audioRef.current.play()
    
   }
   ()=> mounted = false
},[populate])

const trackStyle = {
  background: `linear-gradient(to right, green ${songInfo.animationPercentage}%, grey ${songInfo.animationPercentage}%)`,
};

  return (
    <div className="mt-12">
      <div>
        <div className="flex flex-row justify-between items-center px-10">
          <p className="font-sans font-poppins">
            <span className="text-gray-500 text-xs leading-4 break-words">
             {`0:${Math.round(songInfo.currentTime)}`}
            </span>
          </p>
          <p className="font-sans font-poppins">
            <span className="text-gray-500 text-xs leading-4 break-words">
              {millisecondsToMinutes(populate[0]?.track?.duration_ms)}
            </span>
          </p>
        </div>
        <div className="flex flex-row justify-center items-center">
        <input
            type="range"
            className="w-64 h-1 appearance-none bg-black rounded"
            style={{ outline: "none", ...trackStyle }}
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
        </div>
      </div>
      <div className="flex flex-row items-center px-10 justify-evenly py-2">
        <div>
          <button>
            <img src={shuffle} alt="shuffle" />
          </button>
        </div>
        <div>
          <button onClick={reversal}>
            <img src={reverse} alt="reverse" />
          </button>
        </div>

        {isplayed ? (
          <div>
            <button className="p-2"onClick={playSongHandler}>
              <img src={pause} alt="pause" className="w-10 h-10" />
            </button>
          </div>
        ) : (
          <div>
            <button className="p-2" onClick={playSongHandler}>
              <img src={play} alt="play" className="w-10 h-10" />
            </button>
          </div>
        )}

        <div>
          <button onClick={FastForward}>
            <img src={forward} alt="forward" />
          </button>
        </div>
        <div>
          <button>
            <img src={replay} alt="replay" />
          </button>
        </div>
      </div>
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        src={populate[0]?.track?.preview_url}
        ref={audioRef}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}
