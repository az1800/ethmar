"use client";
import React from "react";
import Image from "next/image";
import manPlaceholder from "../Assets/man-placeholder.svg";
import womanPlaceholder from "../Assets/woman-placeholder.svg";
// import placeHolder from "../Assets/transparent.png";

// import getMembers from "../Services/membersAPI";
type MemberCardProps = {
  gender?: string;
  name: string;
  position?: string;
  imageLink?: string;
  committee?: string;
  className?: string;
};

export default function Card({
  gender,
  name,
  position,
  imageLink,
  committee,
  className,
}: MemberCardProps) {
  return (
    <div className={` text-black ${className}  `}>
      {gender ? (
        <img
          src={gender === "Female" ? womanPlaceholder.src : manPlaceholder.src}
          alt={`${name} placeholder`}
          height={300}
          width={300}
          className="rounded-full mx-auto"
        />
      ) : (
        <div className="w-[10rem] h-[10rem] flex items-center justify-center rounded-full bg-white border-2 border-gray-300 mx-auto mb-2">
          <Image
            src={imageLink || ""}
            alt={`${name} profile`}
            height={200}
            width={200}
            className="rounded-full px-4"
          />
        </div>
      )}

      <h1 className="text-lg font-semibold mx-auto w-fit">{name}</h1>
      {position && (
        // <p className="w-fit mx-auto text-center">
        <p className="mx-auto text-center">
          {`${position}
         ${
           committee && committee !== "قادة الفرق"
             ? ` في لجنة ${committee}`
             : ""
         }
          `}
        </p>
      )}
    </div>
  );
}
