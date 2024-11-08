import React from "react";
import { Button } from "./Button";

export const Loader = () => {
  return (
    <Button type="button" className="bg-indigo-500 ...">
      <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
      Loading...
    </Button>
  );
};
