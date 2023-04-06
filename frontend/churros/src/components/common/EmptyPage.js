import React from "react";

const EmptyPage = ({ message, className }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center h-full w-full text-gray-500`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 8a6 6 0 00-6-6 6 6 0 00-6 6v8a2 2 0 002 2h12a2 2 0 002-2V8h0z"
        />
      </svg>
      <h2 className="text-lg font-medium text-center">{message}</h2>
    </div>
  );
};

export default EmptyPage;
