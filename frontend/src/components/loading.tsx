import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-40 gap-8">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>

        <div className="absolute inset-2 border-4 border-transparent border-t-red-400 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>

        <div className="absolute inset-4 border-4 border-transparent border-t-emerald-400 rounded-full animate-[spin_2s_linear_infinite]"></div>
      </div>

      <p className="text-gray-500 font-medium tracking-widest animate-pulse">
        LOADING<span className="animate-bounce inline-block">...</span>
      </p>
    </div>
  );
};

export default Loading;