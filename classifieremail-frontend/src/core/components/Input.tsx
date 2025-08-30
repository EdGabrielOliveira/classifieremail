import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label?: string;
  isTextArea?: boolean;
}

export default function Input({ placeholder, label, isTextArea, ...props }: InputProps) {
  const styled =
    "w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

  return (
    <div>
      <label className="block text-sm xs:text-base lg:text-lg font-medium text-gray-300 mb-1 xs:mb-2">{label}</label>
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          className={`${styled} min-h-[80px] xs:min-h-[100px] resize-y`}
          rows={4}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input type="text" placeholder={placeholder} className={styled} {...props} />
      )}
    </div>
  );
}
