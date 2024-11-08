import React from "react";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-full mt-20">
      <div className="bg-red-100 text-red-600 border border-red-400 px-4 py-3 rounded-md text-center max-w-md mx-auto shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Error</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
