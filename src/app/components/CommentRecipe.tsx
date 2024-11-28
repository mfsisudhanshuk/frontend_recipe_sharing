'use client';

import React, { useState } from "react";
import { Button } from "./common/Button";

export interface User {
  id: string;
  email: string;
  name: string;
}
interface CommentFormProps {
  onAddComment: (recipeId: string, text: string, user: User) => Promise<void>;
  recipeId: string;
  user: User;
}

export const CommentForm: React.FC<CommentFormProps> = ({ onAddComment,recipeId, user }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;
    try {
      setLoading(true);
      await onAddComment(recipeId, text, user);
      setText("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <textarea
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          rows={4}
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};