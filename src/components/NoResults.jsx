// src/components/NoResults.jsx
import React from "react";

const NoResults = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="relative mb-6">
        <div className="w-32 h-32 rounded-full bg-pink-100 animate-pulse" />
        <div className="absolute inset-3 rounded-full bg-pink-500/90 flex items-center justify-center">
          <span className="text-4xl text-white">:/</span>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
        No products found
      </h2>
      <p className="text-sm md:text-base text-slate-500 max-w-md">
        Try changing your filters or search term. Sometimes the best styles hide
        behind a different category or price range.
      </p>
    </div>
  );
};

export default NoResults;
