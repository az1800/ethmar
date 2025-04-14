"use client";

import React from "react";

type FilterProps = {
  name: string;
  icon?: React.ElementType;
  isActive: boolean;
  onClick: () => void; // ✅ Add onClick prop for handling selection
};

export default function Filter({
  name,
  icon: Icon,
  isActive,
  onClick,
}: FilterProps) {
  return Icon ? (
    <button
      className={`rounded-2xl flex flex-row w-[305px] h-[96px] px-[30px] py-[16px] items-center justify-end gap-[12px] shrink-0 ${
        isActive ? "bg-[#164B20]" : "bg-white border-2"
      }`}
      onClick={onClick} // ✅ Correctly use onClick prop
    >
      <h1 className={`text-2xl ${isActive ? "text-white" : "text-black"}`}>
        {name}
      </h1>
      {Icon && (
        <div className="bg-[#FBF6EA] rounded h-8 w-8 flex items-center justify-center">
          <Icon size={24} />
        </div>
      )}
    </button>
  ) : (
    <>
      <div className="text-center w-full" onClick={onClick}>
        {" "}
        <h1 className={`text-2xl`}>{name}</h1>
      </div>
    </>
  );
}
