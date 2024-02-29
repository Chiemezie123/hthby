import React from "react";
import TrendFiles from "../sharedComponents/TrendFiles";
import TrackFiles from "../sharedComponents/TrackFiles";
import { Data } from "../sharedComponents/Data";
import Toggle from "../sharedComponents/Toggle";

export default function Beside({ getplayist, getIndividualPlaylists,switchMode, setSwtichMode }) {
  const access_token = localStorage.getItem("access_token")
  return (
    <div className={switchMode ? "bg-white" : "bg-black"}>
      <div className="px-4 py-2">
        <div className="  text-gray-800 text-2xl font-bold font-poppins font-semibold  break-words  py-4 flex items-center justify-between" >
          <h2 className="text-green-500 font-sans font-poppins">
            Fuzzy
            <br />
            Music App
          </h2>
          <div> 
            <Toggle switchMode={switchMode} setSwtichMode={setSwtichMode}/>
          </div>
        </div>
        <div className="pb-4">
          <div>
            <input type="text" placeholder="search" />
          </div>
        </div>
        <div className="">
          <div className="flex flex-row justify-between items-center pb-2">
            <div>
              <h2 className={`${switchMode ? "text-black-500": "text-green-500"} text-lg font-medium font-poppins  leading-5 break-words`}>
                My playlist
              </h2>
            </div>
            <div>
              <select name="" id="">
                Week
              </select>
            </div>
          </div>
          {getplayist ? (
            <div className="grid grid-cols-2 gap-1 cursor-pointer">
              {getplayist.map((file) => (
                <TrendFiles
                  key={file.id} 
                  artist={file?.owner?.display_name || "Unknown Artist"}
                  img={file?.images?.[0]?.url || ""} 
                  title={file?.name || "Untitled Playlist"} 
                  id={file?.id}
                  className="p-0"
                  switchMode={switchMode}
                  onClick={(id) => getIndividualPlaylists(id, access_token)}
                />
              ))}
            </div>
          ) : (
            <p>loading...</p>
          )}
        </div>
        <div className="">
          <div className="py-2">
            <h2 className="text-gray-700 text-base font-sans font-poppins leading-5 break-words">
              You may like
            </h2>
          </div>
          <div>
            {Data.map((track) => (
              <TrackFiles
                img={track.img}
                title={track.title}
                artist={track.artist}
                year={track.year}
                timeDuration={track.timeDuration}
                switchMode={switchMode}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
