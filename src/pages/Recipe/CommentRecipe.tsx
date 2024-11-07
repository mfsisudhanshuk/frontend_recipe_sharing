// components/CommentForm.tsx
import React, { useState } from "react";
import { Button } from "../../components/common/Button";

interface CommentFormProps {
  onAddComment: (username: string, text: string) => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && text) {
      onAddComment(username, text);
      setUsername("");
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          rows={4}
        />
      </div>
      <Button type="submit" onClick={()=>handleSubmit}>Submit</Button>
    </form>
  );
};
