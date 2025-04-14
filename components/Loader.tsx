import React from "react";
import "tailwindcss/tailwind.css";

const Loader = () => {
  return (
    <div className="w-48 h-48 rounded-full relative animate-spin mx-auto my-12">
      <div className="absolute inset-0 rounded-full border-4 border-[RGB(22,75,32,0.28)] animate-[prixClipFix_2s_linear_infinite]"></div>
      <div className="absolute inset-0 rounded-full border-4 border-[#164B20] animate-[prixClipFix_2s_linear_infinite] rotate-[180deg]"></div>
      <style>
        {`
          @keyframes prixClipFix {
            0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
            50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
            75%, 100%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
