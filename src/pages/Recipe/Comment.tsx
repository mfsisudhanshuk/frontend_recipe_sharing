// components/Comment.tsx
import React from 'react';

interface CommentProps {
  username: string;
  text: string;
  timestamp: string;
}

export const Comment: React.FC<CommentProps> = ({ username, text, timestamp }) => {
  return (
    <div className="border-b border-gray-300 pb-4 mb-4">
      <h4 className="text-sm font-bold text-gray-800">{username}</h4>
      <p className="text-gray-600">{text}</p>
      <span className="text-xs text-gray-500">{timestamp}</span>
    </div>
  );
};
