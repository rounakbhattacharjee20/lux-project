// src/pages/ProductDetails.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../context/DataContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import Toast from "../../components/Toast.jsx";
import Loading from "../../assets/loading.webm";

const SIZES = ["XS", "S", "M", "L", "XL"];
const MAX_QUANTITY = 10;

const ProductDetails = () => {
  const { id } = useParams();
  const { data, fetchAllProducts, error: fetchError } = getData();
  const { addToCart } = useCart();

  // State Management
  const [size, setSize] = useState(""); // Empty initially - user must select
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    fetchAllProducts().catch((err) => {
      console.error("Failed to fetch products:", err);
    });
  }, [fetchAllProducts]);

  // Show toast notification
  const showToast = useCallback((message, type = "success", duration = 3000) => {
    setToast({ message, type, duration });
  }, []);

  // Close toast
  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  // Validate product data
  const isValidProduct = (product) => {
    return (
      product &&
      product.id &&
      product.title &&
      typeof product.price === "number" &&
      product.price > 0
    );
  };

  // Handle loading state
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <video
            muted
            autoPlay
            loop
            className="w-32 h-32 md:w-40 md:h-40 object-contain"
            aria-hidden="true"
          >
            <source src={Loading} type="video/webm" />
          </video>
          <p className="text-slate-600 text-sm font-medium">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  // Handle fetch errors
  if (fetchError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <p className="text-red-600 text-lg font-semibold mb-2">
            ✕ Error Loading Products
          </p>
          <p className="text-slate-600 text-sm mb-6">{fetchError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition"
            aria-label="Retry loading products"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Find product
  const product = data.find((p) => String(p.id) === String(id));

  // Handle product not found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <p className="text-slate-600 text-lg font-semibold mb-2">
            Product Not Found
          </p>
          <p className="text-slate-500 text-sm mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/products"
            className="inline-block px-6 py-2 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition"
          >
            Back to Products
          </a>
        </div>
      </div>
    );
  }

  // Validate product before rendering
  if (!isValidProduct(product)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <p className="text-red-600 text-lg font-semibold mb-2">
            Invalid Product Data
          </p>
          <p className="text-slate-600 text-sm mb-6">
            Product information is incomplete or corrupted.
          </p>
          <a
            href="/products"
            className="inline-block px-6 py-2 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition"
          >
            Back to Products
          </a>
        </div>
      </div>
    );
  }

  // Get product image safely
  const image =
    product.images && product.images.length > 0 ? product.images[0] : null;

  // Handle add to cart with validation
  const handleAddToCart = async () => {
    try {
      // Validate size selection
      if (!size || size.trim() === "") {
        showToast(
          "⚠ Please select a size before adding to cart",
          "warning",
          3500
        );
        return;
      }

      // Validate quantity
      if (qty < 1 || qty > MAX_QUANTITY) {
        showToast(
          `⚠ Quantity must be between 1 and ${MAX_QUANTITY}`,
          "warning",
          3500
        );
        return;
      }

      setIsAdding(true);

      // Create cart item
      const cartItem = {
        ...product,
        selectedSize: size,
        quantity: qty,
      };

      // Simulate async operation (API call)
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Add to cart
      addToCart(cartItem);

      // Show success message
      showToast(
        `✓ Added ${qty} ${product.title}${qty > 1 ? "s" : ""} (Size: ${size}) to cart`,
        "success",
        3500
      );

      // Reset form
      setSize("");
      setQty(1);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      showToast(
        "✕ Failed to add item to cart. Please try again.",
        "error",
        4000
      );
    } finally {
      setIsAdding(false);
    }
  };

  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-8">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-2xl shadow-md p-4">
              {!imageLoaded && !imageError && (
                <div className="w-full h-80 bg-slate-200 rounded-xl flex items-center justify-center animate-pulse">
                  <p className="text-slate-500 text-sm">Loading image...</p>
                </div>
              )}

              {image && !imageError ? (
                <img
                  src={image}
                  alt={product.title}
                  className={`w-full h-80 object-cover rounded-xl transition-opacity ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-80 bg-slate-300 rounded-xl flex items-center justify-center">
                  <p className="text-slate-600 font-medium">
                    {imageError ? "Image failed to load" : "No image available"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            {/* Category */}
            <p className="text-xs uppercase tracking-wide text-pink-500 font-semibold">
              {product.category?.name || "Uncategorized"}
            </p>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {product.title}
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              {product.description || "No description available."}
            </p>

            {/* Price */}
            <p className="text-2xl font-bold text-pink-600 mt-2">
              ₹{product.price.toFixed(2)}
            </p>

            {/* ✅ INLINE SIZE SELECTOR - BUTTONS DISPLAY */}
<div className="flex flex-col gap-3 mt-4">
  <div className="flex items-center justify-between">
    <label className="text-sm font-semibold text-slate-700">
      Size:
    </label>
    {size && (
      <span className="text-xs text-pink-600 font-medium">
        Selected: {size}
      </span>
    )}
  </div>
  <div className="flex flex-wrap gap-2">
    {SIZES.map((s) => (
      <button
        key={s}
        onClick={() => setSize(s)}
        className={`
          inline-flex items-center justify-center
          min-w-[2.75rem] h-[2.75rem] px-3
          rounded-md text-sm font-semibold uppercase
          transition-all duration-200
          ${
            size === s
              ? "bg-pink-500 text-white border-2 border-pink-500 shadow-md hover:bg-pink-600 hover:border-pink-600"
              : "bg-white text-slate-600 border-2 border-slate-300 hover:border-pink-500 hover:bg-pink-100"
          }
        `}
        aria-label={`Select size ${s}`}
        aria-pressed={size === s}
        type="button"
      >
        {s}
      </button>
    ))}
  </div>
  {!size && (
    <p className="text-xs text-red-500 font-medium">
      ⚠ Size selection required
    </p>
  )}
</div>

            {/* Quantity Selector */}
            <div className="flex flex-col gap-2 mt-4">
              <label className="text-sm font-semibold text-slate-700">
                Qty:
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty === 1 || isAdding}
                  className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-sm font-semibold hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  aria-label="Decrease quantity"
                  type="button"
                >
                  −
                </button>
                <span
                  className="w-10 text-center text-sm font-semibold"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(MAX_QUANTITY, q + 1))}
                  disabled={qty === MAX_QUANTITY || isAdding}
                  className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-sm font-semibold hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  aria-label="Increase quantity"
                  type="button"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Max quantity: {MAX_QUANTITY}
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding || !size}
              className={`mt-6 inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-200 shadow-md ${
                isAdding || !size
                  ? "bg-slate-400 cursor-not-allowed text-white"
                  : "bg-pink-500 text-white hover:bg-pink-600 hover:shadow-lg"
              }`}
              aria-label={
                !size
                  ? "Select a size first"
                  : `Add ${qty} item${qty > 1 ? "s" : ""} to cart`
              }
              type="button"
            >
              {isAdding ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Adding...
                </>
              ) : (
                <>
                  <span className="mr-2">🛒</span>
                  Add to Cart
                </>
              )}
            </button>

            {/* Stock Status / Additional Info */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700 font-medium">
                ✓ Free shipping on orders above ₹500
              </p>
            </div>

            {/* Order Summary */}
            {size && qty > 0 && (
              <div className="mt-4 p-3 bg-slate-100 rounded-lg border border-slate-200">
                <p className="text-xs font-medium text-slate-700">
                  Order Summary:
                </p>
                <div className="mt-2 space-y-1 text-xs text-slate-600">
                  <p>
                    Product: <span className="font-semibold">{product.title}</span>
                  </p>
                  <p>
                    Size: <span className="font-semibold">{size}</span>
                  </p>
                  <p>
                    Quantity: <span className="font-semibold">{qty}</span>
                  </p>
                  <p className="border-t border-slate-300 pt-1 mt-1">
                    Subtotal:{" "}
                    <span className="font-semibold text-pink-600">
                      ₹{(product.price * qty).toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

        {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={closeToast}
        />
      )}
    </>
  );
};

export default ProductDetails;

