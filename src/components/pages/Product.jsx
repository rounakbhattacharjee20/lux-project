// src/components/pages/Product.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getData } from "../../context/DataContext.jsx";
import FilterSection from "../FilterSection.jsx";
import Loading from "../../assets/loading.webm";
import ProductCard from "../ProductCard.jsx";
import NoResults from "../NoResults.jsx";
import { Filter, X } from "lucide-react";

const ITEMS_PER_PAGE = 8;

const SORT_OPTIONS = [
  { value: "top", label: "Top Order" },
  { value: "latest", label: "Latest Order" },
  { value: "recent", label: "Recent View" },
];

const Product = () => {
  const {
    fetchAllProducts,
    fetchProductsByCategory,
    fetchProductsByCategoryAndSubcategory,
    error,
    filteredProducts,
    data,
    setSelectedCategory,
    setSelectedSubcategory,
  } = getData();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("top");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const locationHook = useLocation();
  const searchParams = new URLSearchParams(locationHook.search);
  const heroCategory = searchParams.get("category");
  const apparelType = searchParams.get("apparel");

  // Fetch products based on URL params
  useEffect(() => {
    if (heroCategory && apparelType) {
      setSelectedCategory(heroCategory);
      setSelectedSubcategory(apparelType);
      fetchProductsByCategoryAndSubcategory(heroCategory, apparelType);
    } else if (heroCategory) {
      setSelectedCategory(heroCategory);
      setSelectedSubcategory("ALL");
      fetchProductsByCategory(heroCategory);
    } else {
      setSelectedCategory("ALL");
      setSelectedSubcategory("ALL");
      fetchAllProducts();
    }
  }, [
    heroCategory,
    apparelType,
    fetchAllProducts,
    fetchProductsByCategory,
    fetchProductsByCategoryAndSubcategory,
    setSelectedCategory,
    setSelectedSubcategory,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts, sortBy, heroCategory, apparelType]);

  // IMPORTANT: loading should follow context "loading", not just data null
  const isLoading = !data && filteredProducts.length === 0;
  const isEmpty = data && data.length === 0;

  // sorted view of filteredProducts (always an array)
  const baseProducts = [...filteredProducts];
  let sorted = [...baseProducts];

  if (sortBy === "latest") {
    sorted.sort((a, b) => (b.prodm_rid || 0) - (a.prodm_rid || 0));
  } else if (sortBy === "top") {
    sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
  }

  const totalItems = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = sorted.slice(startIndex, endIndex);

  const isFilteredEmpty = !isLoading && totalItems === 0;

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen py-6 sm:py-10 bg-gradient-to-b from-pink-50 via-slate-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 mb-10">
        {/* Page Heading */}
        <div className="mb-6 sm:mb-8 flex flex-col gap-1 sm:gap-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
            Discover your next favorite
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-500">
            Filter by category, brand, and price to find products that match your style.
          </p>
          {(heroCategory || apparelType) && (
            <p className="text-xs text-slate-600 mt-1 sm:mt-2 font-semibold">
              Filters:{" "}
              {heroCategory && (
                <span className="capitalize text-pink-600">{heroCategory}</span>
              )}
              {apparelType && (
                <span className="capitalize text-pink-600">
                  {" "}
                  • {apparelType}
                </span>
              )}
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-[300px] sm:h-[400px]">
            <video
              muted
              autoPlay
              loop
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
            >
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center font-medium text-sm sm:text-base">
            {error}
          </p>
        ) : (
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
            {/* Filter Sidebar */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="md:hidden w-full flex items-center gap-2 bg-white border border-slate-300 rounded-lg px-4 py-2.5 mb-4 font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>

              <div
                className={`${
                  mobileFilterOpen
                    ? "fixed inset-0 bg-black/50 z-40 md:relative md:bg-transparent md:inset-auto"
                    : "hidden md:block"
                }`}
                onClick={() => setMobileFilterOpen(false)}
              >
                <div
                  className="bg-white md:bg-transparent p-4 sm:p-6 overflow-y-auto max-h-[80vh] md:max-h-none w-full md:w-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="md:hidden mb-4 p-2"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <FilterSection />
                </div>
              </div>
            </div>

            {/* Products Grid + Sort + Pagination */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                <p className="text-xs sm:text-sm text-slate-600 order-2 sm:order-1">
                  Showing{" "}
                  <span className="font-semibold">{currentItems.length}</span>{" "}
                  of <span className="font-semibold">{totalItems}</span> products
                </p>
                <div className="w-full sm:w-auto flex items-center justify-end gap-2 order-1 sm:order-2">
                  <span className="text-xs sm:text-sm text-slate-500 hidden sm:inline">
                    Sort by:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-slate-300 rounded-full px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 flex-1 sm:flex-none"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {isEmpty || isFilteredEmpty ? (
                <NoResults />
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 auto-rows-max">
                    {currentItems.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  <div className="mt-6 sm:mt-10 flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold border
                        ${
                          currentPage === 1
                            ? "text-slate-300 border-slate-200 cursor-not-allowed"
                            : "text-slate-700 border-slate-300 hover:bg-slate-100"
                        }`}
                    >
                      Prev
                    </button>

                    {Array.from({ length: totalPages }).map((_, index) => {
                      const page = index + 1;
                      const showOnMobile =
                        page === 1 ||
                        page === currentPage ||
                        page === totalPages ||
                        Math.abs(page - currentPage) === 1;

                      if (totalPages <= 5 || showOnMobile) {
                        return (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md text-xs sm:text-sm font-semibold flex items-center justify-center
                              ${
                                page === currentPage
                                  ? "bg-pink-500 text-white shadow"
                                  : "text-slate-700 hover:bg-slate-100"
                              }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (page === 2 || page === totalPages - 1) {
                        return (
                          <span key={page} className="text-slate-500">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold border
                        ${
                          currentPage === totalPages
                            ? "text-slate-300 border-slate-200 cursor-not-allowed"
                            : "text-slate-700 border-slate-300 hover:bg-slate-100"
                        }`}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
