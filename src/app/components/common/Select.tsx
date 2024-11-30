import React from "react";

interface SelectProps {
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: number | string; label: string }[];
  placeholder?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  className = "",
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`w-full md:w-1/5 px-4 py-2 border border-gray-300 rounded-lg ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
