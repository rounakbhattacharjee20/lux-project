// src/components/pages/Cart.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { Trash2, ShoppingCart } from "lucide-react";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-10">
        <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mb-4" />
        <p className="text-slate-500 text-base sm:text-lg font-semibold mb-6 text-center">
          Your cart is empty.
        </p>
        <Link
          to="/product"
          className="px-6 py-2.5 rounded-lg sm:rounded-full bg-pink-500 text-white text-sm sm:text-base font-semibold hover:bg-pink-600 transition active:scale-95"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen py-6 sm:py-10 bg-gradient-to-b from-pink-50 via-slate-50 to-purple-50">
      <div className="max-w-6xl mx-auto mb-10 px-3 sm:px-4">
        {/* Header */}
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 text-slate-900">
          My Cart{" "}
          <span className="text-pink-600 text-xl sm:text-2xl md:text-3xl">
            ({cartItems.length})
          </span>
        </h1>

        {/* Cart Items Container */}
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {cartItems.map((item, index) => {
            const qty = item.quantity || 1;
            const lineTotal = (item.price || 0) * qty;

            return (
              <div
                key={index}
                className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow"
              >
                {/* Product Image - Responsive Size */}
                <div className="flex-shrink-0">
                  <img
                    src={item.image || item.images?.[0]}
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                  />
                </div>

                {/* Product Info - Responsive */}
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-slate-900 text-xs sm:text-sm md:text-base line-clamp-2 mb-1">
                    {item.title}
                  </h2>
                  {item.category?.name && (
                    <p className="text-xs text-slate-500 mb-1 line-clamp-1">
                      {item.category.name}
                    </p>
                  )}
                  <p className="text-xs text-slate-500">
                    Size:{" "}
                    <span className="font-semibold text-slate-700">
                      {item.selectedSize || "M"}
                    </span>
                  </p>
                </div>

                {/* Mobile Layout: Stacked Below */}
                <div className="w-full sm:hidden grid grid-cols-2 gap-2 pt-3 border-t border-slate-200">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1 bg-slate-50 rounded-lg p-1.5">
                    <button
                      onClick={() => updateQuantity(index, qty - 1)}
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs font-bold hover:bg-slate-200 active:scale-95 transition-all flex-shrink-0"
                    >
                      −
                    </button>
                    <span className="flex-1 text-center text-xs font-semibold">
                      {qty}
                    </span>
                    <button
                      onClick={() => updateQuantity(index, qty + 1)}
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs font-bold hover:bg-slate-200 active:scale-95 transition-all flex-shrink-0"
                    >
                      +
                    </button>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <div className="text-right mb-1">
                      <p className="text-xs text-slate-500 line-clamp-1">
                        ₹{item.price} × {qty}
                      </p>
                      <p className="font-bold text-pink-600 text-sm">
                        ₹{lineTotal.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-red-500 hover:bg-red-50 p-1.5 rounded transition active:scale-95"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Desktop Layout: Horizontal */}
                <div className="hidden sm:flex items-center gap-2 sm:gap-3">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-50 rounded-lg p-2">
                    <button
                      onClick={() => updateQuantity(index, qty - 1)}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-slate-300 flex items-center justify-center text-xs sm:text-sm font-bold hover:bg-slate-200 active:scale-95 transition-all flex-shrink-0"
                    >
                      −
                    </button>
                    <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-semibold">
                      {qty}
                    </span>
                    <button
                      onClick={() => updateQuantity(index, qty + 1)}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-slate-300 flex items-center justify-center text-xs sm:text-sm font-bold hover:bg-slate-200 active:scale-95 transition-all flex-shrink-0"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right min-w-[90px] sm:min-w-[100px]">
                    <p className="text-xs text-slate-500">
                      ₹{item.price} × {qty}
                    </p>
                    <p className="font-bold text-pink-600 text-sm md:text-base">
                      ₹{lineTotal.toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(index)}
                    className="px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-lg transition active:scale-95 flex items-center gap-1.5 flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 my-6 sm:my-8"></div>

        {/* Total & Checkout Section */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Order Summary */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
            <p className="text-sm text-slate-600 mb-2">Order Total</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-slate-900">
                ₹
              </span>
              <span className="text-3xl sm:text-4xl font-bold text-pink-600">
                {totalPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in cart
            </p>
          </div>

          {/* Checkout Button */}
          <button className="w-full px-6 py-3 sm:py-4 rounded-lg sm:rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-base sm:text-lg hover:from-pink-600 hover:to-rose-600 transition active:scale-95 shadow-lg">
            Proceed to Checkout
          </button>

          {/* Continue Shopping Link */}
          <Link
            to="/product"
            className="w-full text-center py-2.5 text-pink-600 hover:text-pink-700 font-semibold text-sm sm:text-base transition border border-pink-200 rounded-lg hover:bg-pink-50"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
