import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FetchInstance from "../Utils/FetchInstance";


function CallbackHandler() {
  const nav = useNavigate();
  const [isdisplaying, setIsDisplaying] = useState(false);
  const [isprofile, setIsProfile] = useState([]);
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const client_id = localStorage.getItem("isClientId");

  
  async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    console.log("result:",result)
  
    if (!result.ok) {
      const errorResponse = await result.json();
      console.error("Error response from Spotify API:", errorResponse);
      throw new Error("Failed to get access token from Spotify API");
    }

    const { access_token } = await result.json();
    return access_token;
  }

  
  
  
  
  
  
  
  async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    return await result.json();
  }

  const MoveTo = () => {
    nav("/main");
  };

  const Navigate = async () => {
    try {

      const access_token = await getAccessToken(client_id, code);
      localStorage.setItem("access_token", access_token);
       const Data = await fetchProfile(access_token);

      localStorage.setItem("user_id",Data.id);
      console.log("userID",Data.id);
      setIsProfile((profile) =>([...profile,Data]));
      setIsDisplaying(true);

    } catch (error) {
      console.error("Error getting access token:", error);
    }
  };
  console.log("isProfile", isprofile);
  
  return (
    <>
      <div className="py-3 px-4">
        {!isdisplaying ? (
          <>
            <div>
              <h2>processing callback...</h2>
            </div>
            <button
              onClick={Navigate}
              className="bg-violet-500 outline-none text-white py-2 mt-2 px-2"
            >
              continue
            </button>
          </>
        ) : (
          <>
            {isprofile &&
              isprofile?.map((profile) => (
                <>
                  <div className="flex flex-row my-10 items-center justify-center">
                    <div>
                      <h2>you are logged in as :</h2>
                      <div>
                        <div>
                          <label htmlFor="">E-mail:</label>
                          <p>{profile.email}</p>
                        </div>
                        <div>
                          <label htmlFor="">Dispay_name:</label>
                          <p>{profile.display_name}</p>
                        </div>
                        <div>
                          <label htmlFor="">Country:</label>
                          <p>{profile.country}</p>
                        </div>
                        <div>
                          <label htmlFor="">Product:</label>
                          <p>{profile.product}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      className="bg-violet-500 outline-none text-white py-2 mt-2 px-2 "
                      onClick={MoveTo}
                    >
                      continue to app
                    </button>
                  </div>
                </>
              ))}
          </>
        )}
      </div>
    </>
  );
}

export default CallbackHandler;
