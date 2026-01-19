// src/components/ApparelSubsection.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../context/DataContext.jsx";

const ApparelSubsection = ({ category, onClose }) => {
  const { subcategories, fetchSubcategories } = getData();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch subcategories when category changes
    if (category) {
      fetchSubcategories(category);
    }
  }, [category, fetchSubcategories]);

  const handleSubcategoryClick = (subcategoryId) => {
    // Navigate to product page with category and subcategory filters
    navigate(`/product?category=${category}&apparel=${subcategoryId}`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 capitalize">
            {category} Apparels
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {subcategories.length === 0 ? (
          <p className="text-slate-500 text-center py-4">Loading subcategories...</p>
        ) : (
          <div className="space-y-3">
            {subcategories.map((sub) => (
              <button
                key={sub.dd_index}
                onClick={() => handleSubcategoryClick(sub.dd_index)}
                className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-pink-500 hover:bg-pink-50 transition"
              >
                <span className="text-lg font-semibold text-slate-900">
                  {sub.dd_value || `Subcategory ${sub.dd_index}`}
                </span>
                <span className="ml-auto text-pink-500">→</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApparelSubsection;
