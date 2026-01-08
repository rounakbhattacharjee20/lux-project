// src/components/FilterSection.jsx
import React, { useState } from "react";
import { getData } from "../context/DataContext.jsx";
import { ChevronDown } from "lucide-react";

const FilterSection = () => {
  const {
    searchTerm,
    setSearchTerm,
    categoryOnlyData,
    selectedCategory,
    setSelectedCategory,
    brandList,
    selectedBrand,
    setSelectedBrand,
    maxPrice,
    setMaxPrice,
    resetFilters,
  } = getData();

  // ✅ NEW: Mobile collapse states for each filter section
  const [expandedSections, setExpandedSections] = useState({
    search: true,
    category: true,
    brand: true,
    price: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-pink-100 p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-6 bg-gradient-to-b from-white via-rose-50 to-pink-50">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm sm:text-base font-bold text-slate-900">
          Filters
        </h2>
        <span className="px-2 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold bg-pink-100 text-pink-700">
          Live
        </span>
      </div>

      {/* Search */}
      <div className="border-b border-pink-100 pb-3 sm:pb-4 md:border-b md:pb-6">
        <button
          onClick={() => toggleSection("search")}
          className="md:hidden w-full flex items-center justify-between py-2"
        >
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
            Search
          </h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.search ? "rotate-180" : ""
            }`}
          />
        </button>

        <h3 className="hidden md:block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">
          Search
        </h3>

        {expandedSections.search && (
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/80 p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-pink-100 text-xs sm:text-sm
                       focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-pink-400">
              ⌕
            </span>
          </div>
        )}
      </div>

      {/* Category */}
      <div className="border-b border-pink-100 pb-3 sm:pb-4 md:border-b md:pb-6">
        <button
          onClick={() => toggleSection("category")}
          className="md:hidden w-full flex items-center justify-between py-2"
        >
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
            Category
          </h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.category ? "rotate-180" : ""
            }`}
          />
        </button>

        <h3 className="hidden md:block text-xs font-semibold text-slate-700 mb-3 uppercase tracking-wide">
          Category
        </h3>

        {expandedSections.category && (
          <div className="flex flex-col gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-700 max-h-48 sm:max-h-64 overflow-y-auto pr-1">
            <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900 transition">
              <span
                className={`w-3 h-3 rounded-full border flex-shrink-0 ${
                  selectedCategory === "ALL"
                    ? "bg-pink-500 border-pink-500"
                    : "border-slate-300"
                }`}
              />
              <input
                type="radio"
                name="category"
                className="hidden"
                checked={selectedCategory === "ALL"}
                onChange={() => setSelectedCategory("ALL")}
              />
              <span>ALL</span>
            </label>

            {categoryOnlyData?.map((item, index) => (
              <label
                key={index}
                className="flex items-center gap-2 cursor-pointer hover:text-slate-900 transition"
              >
                <span
                  className={`w-3 h-3 rounded-full border flex-shrink-0 ${
                    selectedCategory === item
                      ? "bg-pink-500 border-pink-500"
                      : "border-slate-300"
                  }`}
                />
                <input
                  type="radio"
                  name="category"
                  className="hidden"
                  checked={selectedCategory === item}
                  onChange={() => setSelectedCategory(item)}
                />
                <span className="uppercase">{item}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brand */}
      <div className="border-b border-pink-100 pb-3 sm:pb-4 md:border-b md:pb-6">
        <button
          onClick={() => toggleSection("brand")}
          className="md:hidden w-full flex items-center justify-between py-2"
        >
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
            Brand
          </h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.brand ? "rotate-180" : ""
            }`}
          />
        </button>

        <h3 className="hidden md:block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">
          Brand
        </h3>

        {expandedSections.brand && (
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full border border-pink-100 rounded-lg sm:rounded-xl p-2 sm:p-2.5 bg-white text-xs sm:text-sm
                     focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
          >
            <option value="ALL">ALL</option>
            {brandList.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Price Range */}
      <div className="pb-3 sm:pb-4 md:pb-6">
        <button
          onClick={() => toggleSection("price")}
          className="md:hidden w-full flex items-center justify-between py-2"
        >
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
            Price Range
          </h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.price ? "rotate-180" : ""
            }`}
          />
        </button>

        <h3 className="hidden md:block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wide">
          Price Range
        </h3>

        {expandedSections.price && (
          <div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mb-2">
              Up to{" "}
              <span className="font-semibold text-pink-600">${maxPrice}</span>
            </p>
            <input
              type="range"
              min="0"
              max="5000"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-pink-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] sm:text-[11px] text-slate-400 mt-1">
              <span>$0</span>
              <span>$5000</span>
            </div>
          </div>
        )}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600
                   text-white py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold shadow-md transition active:scale-95"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;
