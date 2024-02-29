import React from "react";

export default function CurrentPlay({populate}) {
  return (
    <div className=" text-center">
      {populate && (
        <>
          {populate.map((pop) => (
            <>
              <div>
                <img src={pop?.track?.album?.images[1]?.url} alt="display_images" />
              </div>
              <div className="">
                <h2 className="text-gray-700 text-base font-sans font-poppins font-weight-500 leading-5 break-words capitalize">
                  {pop?.track?.name}
                </h2>
                <p className="text-gray-600 text-xs font-normal font-poppins font-weight-400 leading-5 break-words capitalize">
                {pop?.track?.artists?.map((names) => names.name)?.join(",")}
                </p>
              </div>
            </>
          ))}
        </>
      )}
      {!populate && <p> please the playlist is loading...</p>}
    </div>
  );
}

