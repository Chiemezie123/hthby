import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Beside from "./Beside";
import MainDisplay from "./MainDisplay";
import TrackList from "./TrackList";
import FetchInstance from "../Utils/FetchInstance";

function Main() {
 
  const [getplayist, setGetPlaylist] = useState([]);
  const [individs, setIndivids] = useState([]);
  const [populate, setPopulate] = useState([]);
  const [switchMode ,setSwtichMode]= useState(true);
  const [isplayed, setIsPlayed]=useState(false);

  
  const UserId = localStorage.getItem("user_id");
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    const getUserPlayist = async () => {
      const user = await getAllUserPlaylist(UserId);
      const{ response, data}= user;
      setGetPlaylist((userfile) => [...data?.items]);

    };
    getUserPlayist();
  }, [UserId, access_token]);

  console.log(getplayist,"getplaylist")

  const getAllUserPlaylist = async (userid) => {
    
    const result = await FetchInstance(
      `https://api.spotify.com/v1/users/${userid}/playlists`,
      {
        method: "GET",
        // headers: { Authorization: `Bearer ${token}` },
      }
    );

    return result;
  };

  useEffect(()=>{
  const fire =async()=>{
    const fire = await getIndividualPlaylists(getplayist[0].id)
  }
  fire();
  },[getplayist])

  const getIndividualPlaylists = async (playlist_id) => {
    const result = await FetchInstance(
      `https://api.spotify.com/v1/playlists/${playlist_id}`,
      {
        method: "GET",
        // headers: { Authorization: `Bearer ${token}` },
      }
    );

    const {response,data} = result
      // console.log("response",response);
      // console.log("data",data);
    setIndivids((tracks) => [...data?.tracks?.items]);
    // console.log("response", response.tracks.items);
  };

  const populateMaindisplay = (data) => {
    if (data) {
      setPopulate((pop) => [...data]);
    } else {
      console.log("empty array");
    }
  };
  // console.log("populate", populate);
  // console.log("individ",individs)
  return (
    <>
      <div className="border flex flex-row h-dvh">
        <div className="border h-dvh w-1/12">
          <SideBar />
        </div>
        <div
          className="border  w-1/5 flex-1 overflow-y-auto"
          style={{
            scrollbarThumbHeight: "10px",
            scrollbarWidth: "thin",
            scrollbarColor: "green",
          }}
        >
          <Beside
            getIndividualPlaylists={getIndividualPlaylists}
            getplayist={getplayist}
            switchMode={switchMode}
            setSwtichMode={setSwtichMode}

          />
        </div>
        <div className="border w-2/5 ">
          <MainDisplay
           populate={populate} 
           individs={individs}
           isplayed={isplayed}
          
          
           setIsPlayed={setIsPlayed}
           setPopulate={setPopulate}
          
           />
        </div>
        <div className="border w-1/5 flex-1 overflow-y-auto"
          style={{
            scrollbarThumbHeight: "10px",
            scrollbarWidth: "thin",
            scrollbarColor: "green",
          }}
        >
          <TrackList
            individs={individs}
            populateMaindisplay={populateMaindisplay}
            switchMode={switchMode}
            setIsPlayed={setIsPlayed}
            isplayed={isplayed}
          />
        </div>
      </div>
    </>
  );
}

export default Main;
