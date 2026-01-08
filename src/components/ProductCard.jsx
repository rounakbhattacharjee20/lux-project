// src/components/ProductCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const SIZES = ["XS", "S", "M", "L", "XL"];

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart({
      ...product,
      selectedSize: size,
      quantity: qty,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 p-3 sm:p-4 flex flex-col h-full hover:shadow-md sm:hover:shadow-lg transition-all">
      {/* ✅ FIXED: Image with proper aspect ratio for mobile */}
      <Link to={`/product/${product.id}`}>
        <div className="w-full aspect-square sm:aspect-auto sm:h-40 md:h-48 rounded-lg sm:rounded-xl mb-2 sm:mb-3 overflow-hidden bg-slate-100 cursor-pointer">
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Title - Clickable Link */}
      <Link to={`/product/${product.id}`} className="hover:text-pink-600 transition">
        <h2 className="font-semibold text-slate-900 text-xs sm:text-sm line-clamp-2 mb-1">
          {product.title}
        </h2>
      </Link>

      {/* Category */}
      <p className="text-xs text-slate-500 mb-2 line-clamp-1">
        {product.category?.name}
      </p>

      {/* Price */}
      <p className="font-bold text-pink-600 text-sm sm:text-base mb-2 sm:mb-3">
        ₹{product.price}
      </p>

      {/* Size Selector - Mobile Optimized */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
        <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">
          Size:
        </span>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="border border-slate-300 rounded-lg sm:rounded-full px-1.5 sm:px-2 py-1 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 flex-1 sm:flex-none"
        >
          {SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Quantity Selector - Mobile Optimized */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
        <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">
          Qty:
        </span>
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-slate-300 flex items-center justify-center text-xs font-bold hover:bg-slate-100 active:scale-95 transition-all flex-shrink-0"
        >
          −
        </button>
        <span className="w-6 text-center text-xs sm:text-sm font-semibold">
          {qty}
        </span>
        <button
          onClick={() => setQty((q) => q + 1)}
          className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-slate-300 flex items-center justify-center text-xs font-bold hover:bg-slate-100 active:scale-95 transition-all flex-shrink-0"
        >
          +
        </button>
      </div>

      {/* Add to Cart Button - Mobile Optimized */}
      <button
        onClick={handleAdd}
        className={`mt-auto w-full rounded-lg sm:rounded-full text-white text-xs sm:text-sm font-semibold py-2 sm:py-2.5 transition-all active:scale-95 flex items-center justify-center gap-1.5 sm:gap-2
          ${
            isAdded
              ? "bg-green-500 hover:bg-green-600"
              : "bg-pink-500 hover:bg-pink-600"
          }`}
      >
        <span>{isAdded ? "✓" : "🛒"}</span>
        <span className="hidden sm:inline">
          {isAdded ? "Added!" : "Add to Cart"}
        </span>
        <span className="sm:hidden">{isAdded ? "Added" : "Add"}</span>
      </button>
    </div>
  );
};

export default ProductCard;
