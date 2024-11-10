import React from "react";
import NOT_FOUND from "../../assets/not_found.png";

export const Empty: React.FC = () => {
  return (
    <div
    className="w-screen flex justify-center items-center"
    style={{ height: "80vh" }}
  >
    <img
      src={NOT_FOUND}
      alt="No results"
      className="max-w-full max-h-full object-contain"
    />
  </div>
  
  );
};
