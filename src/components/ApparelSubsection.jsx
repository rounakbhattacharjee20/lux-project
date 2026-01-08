// src/components/ApparelSubsection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const APPAREL_TYPES = {
  women: [
    { id: "t-shirt", label: "T-Shirt", icon: "👕" },
    { id: "fashion-pant", label: "Fashion Pant", icon: "👖" },
    { id: "track-pant", label: "Track Pant", icon: "🩳" },
    { id: "jeans", label: "Jeans", icon: "👖" },
  ],
  men: [
    { id: "t-shirt", label: "T-Shirt", icon: "👕" },
    { id: "shirt", label: "Shirt", icon: "🧥" },
    { id: "pants", label: "Pants", icon: "👖" },
    { id: "shorts", label: "Shorts", icon: "🩳" },
  ],
  kids: [
    { id: "t-shirt", label: "T-Shirt", icon: "👕" },
    { id: "shorts", label: "Shorts", icon: "🩳" },
    { id: "dress", label: "Dress", icon: "👗" },
  ],
};

const ApparelSubsection = ({ category, onClose }) => {
  const navigate = useNavigate();
  const apparels = APPAREL_TYPES[category] || [];

  const handleApparelClick = (apparelId) => {
    // navigate to product page with both category and apparel filter
    navigate(`/product?category=${category}&apparel=${apparelId}`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
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

        <div className="space-y-3">
          {apparels.map((apparel) => (
            <button
              key={apparel.id}
              onClick={() => handleApparelClick(apparel.id)}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-pink-500 hover:bg-pink-50 transition"
            >
              <span className="text-3xl">{apparel.icon}</span>
              <span className="text-lg font-semibold text-slate-900">
                {apparel.label}
              </span>
              <span className="ml-auto text-pink-500">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApparelSubsection;
