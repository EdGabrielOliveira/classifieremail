import React from "react";

interface CardProps {
  title?: string;
  content?: string;
  children?: React.ReactNode;
}

export default function Card({ title, content, children }: CardProps) {
  return (
    <div className="xs:w-full sm:w-full md:w-3xl bg-gray-950/30 flex flex-col backdrop-blur-lg p-4 xs:p-6 sm:p-8 lg:p-12 xl:px-16 rounded-2xl xs:rounded-3xl shadow-2xl">
      <div className="mb-6 xs:mb-8 lg:mb-10 text-white tracking-wide drop-shadow-lg text-center">
        <h2 className="text-lg xs:text-xl sm:text-2xl font-bold">{title}</h2>
        <p className="mt-2 text-xs xs:text-sm">{content}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}
