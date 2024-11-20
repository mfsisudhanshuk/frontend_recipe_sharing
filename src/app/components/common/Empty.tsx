'use client';

import React from "react";
// import NOT_FOUND from "../../assets/not_found.png";
import Image from 'next/image'

export const Empty: React.FC = () => {
  return (
    <div
    className="w-screen flex justify-center items-center"
    style={{ height: "80vh" }}
  >
    <Image
      src={'https://via.placeholder.com/350x150'} //TODO: Update it
      alt="No results"
      className="max-w-full max-h-full object-contain"
      width={200}
      height={300}
    />
  </div>
  
  );
};