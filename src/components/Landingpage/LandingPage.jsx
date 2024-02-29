import React, { useState, useEffect } from "react";

function LandingPage() {
  const [isClientId, setClientId] = useState("");

  async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  function generateCodeVerifier(length) {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  const forNow = (e) => {
    e.preventDefault();
    if (isClientId === "") {
      return;
    } else {
      redirectToAuthCodeFlow(isClientId);
      localStorage.setItem("isClientId", isClientId);
    }
  };

  return (
    <>
      <div className=" flex items-center flex-col justify-center  h-screen">
        <div className="mb-6 capitalize">
          <h1>Cloned spotify app, displaying my playlist and tracks</h1>
        </div>
        <div className="flex items-center  justify-center ">
          <div className="border py-6 px-7">
            <main className="pb-5">
              <form className="flex flex-col" onSubmit={forNow}>
                <label htmlFor="inputTag">Input your spotify Client_id :</label>
                <input
                  id="inputTag"
                  type="text"
                  value={isClientId}
                  placeholder=" Client_id"
                  className="border my-2"
                  onChange={(e) => {
                    setClientId(e.target.value);
                  }}
                />
                <button className="bg-violet-500 outline-none text-white py-2 mt-2 ">
                  Login
                </button>
              </form>
            </main>
          </div>
        </div>
        <div className="mt-4">
          <p>
            Client_id:   <span>  95e65afbd3e440d2977f02f6b3a749ab</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
