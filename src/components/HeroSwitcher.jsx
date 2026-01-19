// src/components/HeroSwitcher.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../context/DataContext.jsx";
import Carousel from "./Carousel.jsx";
import ApparelSubsection from "./ApparelSubsection.jsx";

const HeroSwitcher = () => {
  const { categories, fetchCategories } = getData();
  const [mode, setMode] = useState("grid");
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const categoryCardColors = {
    MENS: { gradient: "from-[#004f9e] to-[#001b3f]" },
    WOMEN: { gradient: "from-[#ff3c7f] to-[#b3004b]" },
    KIDS: { gradient: "from-[#f6b96b] to-[#f97316]" },
  };

  const categoryImages = {
    MENS: "https://images.pexels.com/photos/769772/pexels-photo-769772.jpeg?auto=compress&w=600",
    WOMEN: "https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg?auto=compress&w=600",
    KIDS: "https://images.pexels.com/photos/3661435/pexels-photo-3661435.jpeg?auto=compress&w=600",
  };

  return (
    <div className="bg-[#050816] min-h-screen">
      {/* Toggle Buttons - Mobile Optimized */}
      <div className="max-w-6xl mx-auto px-4 pt-4 sm:pt-6 flex items-center justify-end">
        <div className="inline-flex items-center gap-1 sm:gap-2 bg-slate-900/80 border border-white/10 rounded-full p-1 shadow-lg">
          <button
            onClick={() => setMode("carousel")}
            className={`px-2 sm:px-4 py-1.5 text-xs sm:text-sm rounded-full font-semibold transition whitespace-nowrap
              ${
                mode === "carousel"
                  ? "bg-white text-slate-900 shadow"
                  : "text-slate-200 hover:text-white"
              }`}
          >
            Carousel
          </button>
          <button
            onClick={() => setMode("grid")}
            className={`px-2 sm:px-4 py-1.5 text-xs sm:text-sm rounded-full font-semibold transition whitespace-nowrap
              ${
                mode === "grid"
                  ? "bg-pink-500 text-white shadow"
                  : "text-slate-200 hover:text-white"
              }`}
          >
            Categories
          </button>
        </div>
      </div>

      {/* Content Area */}
      {mode === "carousel" ? (
        <Carousel />
      ) : (
        <div className="max-w-6xl mx-auto px-3 sm:px-4 pt-3 sm:pt-4 pb-8 sm:pb-12">
          <div className="rounded-2xl sm:rounded-[32px] bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-200 p-3 sm:p-4 md:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            {/* ✅ MOBILE: Single column on mobile, 3 columns on tablet+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 mb-2 sm:mb-3">
              {categories.slice(0, 3).map((category) => (
                <CategoryCard
                  key={category.prodm_segment_code}
                  label={category.prodm_segment_name}
                  gradient={
                    categoryCardColors[category.prodm_segment_name]?.gradient ||
                    "from-[#004f9e] to-[#001b3f]"
                  }
                  image={
                    categoryImages[category.prodm_segment_name] ||
                    "https://images.pexels.com/photos/769772/pexels-photo-769772.jpeg?auto=compress&w=600"
                  }
                  tall={false}
                  onClick={() =>
                    handleCategoryClick(category.prodm_segment_name)
                  }
                />
              ))}
            </div>

            {/* ✅ MOBILE: Single column on mobile, 2 columns on tablet+ */}
            {categories.length > 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {categories.slice(3).map((category) => (
                  <CategoryCard
                    key={category.prodm_segment_code}
                    label={category.prodm_segment_name}
                    gradient={
                      categoryCardColors[category.prodm_segment_name]
                        ?.gradient || "from-[#0057c2] to-[#00a0ff]"
                    }
                    image={
                      categoryImages[category.prodm_segment_name] ||
                      "https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&w=600"
                    }
                    tall={true}
                    onClick={() =>
                      handleCategoryClick(category.prodm_segment_name)
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Apparel Subsection Modal */}
      {selectedCategory && (
        <ApparelSubsection
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </div>
  );
};

const CategoryCard = ({ label, gradient, image, tall, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl sm:rounded-[26px] bg-neutral-500/70 border border-white/40 shadow-[0_8px_24px_rgba(0,0,0,0.4)] sm:shadow-[0_14px_40px_rgba(0,0,0,0.55)]
                  flex items-stretch overflow-hidden backdrop-blur-sm
                  transition-all duration-300 active:scale-95 sm:hover:-translate-y-1 sm:hover:shadow-[0_18px_50px_rgba(0,0,0,0.65)]
                  cursor-pointer
                  ${tall ? "h-32 sm:h-40 md:h-48" : "h-24 sm:h-28 md:h-32"}`}
    >
      {/* text side - responsive font sizes */}
      <div className="flex-1 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex items-center px-3 sm:px-5 md:px-6">
        <p className="text-white text-base sm:text-lg md:text-2xl font-extrabold tracking-wide drop-shadow break-words">
          {label}
        </p>
      </div>

      {/* image side */}
      <div className="flex-[1.3] relative overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-90`}
        />
        <img
          src={image}
          alt={label}
          className="h-full w-full object-cover mix-blend-multiply"
        />
      </div>
    </div>
  );
};

export default HeroSwitcher;
