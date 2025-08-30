import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  nome: string;
  variant?: "primary" | "secondary" | "success" | "danger";
  icon?: React.ReactNode;
}

export default function Button({ nome, variant = "primary", className = "", icon, ...props }: ButtonProps) {
  const baseStyles =
    "text-white font-semibold py-2 xs:py-3 px-3 xs:px-4 text-sm xs:text-base border border-gray-300 rounded-lg shadow transition-colors";

  const variantStyles = {
    primary: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
    success: "bg-green-700 hover:bg-green-600 focus:ring-green-500",
    secondary: "bg-gray-500 hover:bg-gray-600 focus:ring-gray-500",
    danger: "bg-orange-900 hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      {...props}
      className={`${baseStyles} ${variantStyles[variant]} flex flex-row items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {nome}
      {icon && <span>{icon}</span>}
    </button>
  );
}
