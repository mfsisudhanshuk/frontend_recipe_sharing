// components/common/Button.tsx
import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = 'button',
  className = '',
  disabled
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all ${className}`}
    >
      {children}
    </button>
  );
};
