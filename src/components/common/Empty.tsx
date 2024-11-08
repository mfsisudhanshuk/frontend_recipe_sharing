import React from "react";
import NOT_FOUND from "../../assets/undraw_Page_not_foud.png";

export const Empty: React.FC = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <img
        src={NOT_FOUND}
        alt="No results"
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
};
