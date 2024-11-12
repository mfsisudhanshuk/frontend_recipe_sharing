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
      src={''}
      alt="No results"
      className="max-w-full max-h-full object-contain"
    />
  </div>
  
  );
};