// src/components/Category.jsx
import React, { useEffect } from "react";
import { getData } from "../context/DataContext.jsx";

const CATEGORY_LABEL_MAP = {
  Clothes: "Male",
  Electronics: "Female",
  Furniture: "Kids",
  Shoes: "Accessories",
  Miscellaneous: "Sale",
};

const Category = () => {
  const { fetchAllProducts, categoryOnlyData } = getData();

  // fetch products once so categories are available
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // turn raw API category names into pretty labels
  const mappedCategoryNames =
    categoryOnlyData
      ?.map((name) => CATEGORY_LABEL_MAP[name])
      .filter(Boolean) || [];

  return (
    <div className="bg-[#101829]">
      <div className="max-w-5xl md:max-w-6xl lg:max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-4 py-6 px-4">
        {mappedCategoryNames.map((name, index) => (
          <button
            key={index}
            className="
              px-8 py-2.5
              rounded-full
              text-sm md:text-base font-semibold tracking-wide
              text-white
              bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600
              shadow-lg shadow-pink-500/40
              transition-all duration-200
              hover:shadow-pink-500/70 hover:-translate-y-0.5 hover:scale-105
            "
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
