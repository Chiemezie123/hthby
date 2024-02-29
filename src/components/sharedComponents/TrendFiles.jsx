import React from "react";

export default function TrendFiles({ title, artist, year, img, className, id,  onClick ,switchMode}) {
  return (
    <div className={className} key={id} onClick={() => onClick(id)}>
      <div>
        <img src={img} alt={title} />
      </div>
      <div>
        <h2 className={`${switchMode? "text-gray-900": "text-green-600"} text-sm font-sans font-poppins leading-5 break-words capitalize`}>
          {title}
        </h2>
        <p className={`${switchMode ? "text-gray-600":"text-white"} text-xs font-sans font-poppins leading-4 break-words`}>
          {artist}
          <span className="text-gray-500 text-xs font-medium font-poppins leading-4 break-words">
            {year}
          </span>
        </p>
      </div>
    </div>
  );
}

