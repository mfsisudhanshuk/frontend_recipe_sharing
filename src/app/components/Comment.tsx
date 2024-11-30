// components/Comment.tsx
import React from "react";
import { convertToIST } from "../utils/formateDate";

interface CommentProps {
  name: string;
  commentText: string;
  timestamp: string;
}

export const Comment: React.FC<CommentProps> = ({
  name,
  commentText,
  timestamp,
}) => {
  return (
    <div className="border-b border-gray-300 pb-4 mb-4">
      <h4 className="text-sm font-bold text-gray-800">{name}</h4>
      <p className="text-gray-600">{commentText}</p>
      <span className="text-xs text-gray-500">{convertToIST(timestamp)}</span>
    </div>
  );
};
