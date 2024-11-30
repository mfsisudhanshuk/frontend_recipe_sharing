import React from "react";
import { Button } from "./Button";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Button type="button" className="bg-indigo-600 flex ">
        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
        Loading...
      </Button>
    </div>
  );
};
