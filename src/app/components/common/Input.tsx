"use client";

// InputField.tsx
import { Field, ErrorMessage } from "formik";

interface inputFieldProps {
  name: string;
  type: string;
  label: string;
  placeholder: string;
}

export const Input: React.FC<inputFieldProps> = ({
  name,
  type,
  label,
  placeholder,
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-sm text-red-500 mt-1"
    />
  </div>
);
