// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MapPin } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useCart } from "../context/CartContext";

const Navbar = ({ location, getLocation, openDropdown, setOpenDropdown }) => {
  const { cartItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // ✅ NEW: mobile menu state

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-white py-3 shadow-2xl sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* Logo + address - DESKTOP only */}
        <div className="hidden md:flex gap-7 items-center">
          <Link to="/">
            <h1 className="font-bold text-3xl">
              <span className="text-red-500 font-serif">L</span>UX
            </h1>
          </Link>

          <div className="flex gap-1 cursor-pointer text-grey-700 items-center">
            <MapPin className="text-red-500 w-5 h-5" />
            <span className="font-semibold text-sm">
              {location ? (
                <div>
                  <p>{location.county}</p>
                  <p>{location.state}</p>
                </div>
              ) : (
                "Add Address"
              )}
            </span>

            <FaCaretDown onClick={toggleDropdown} className="cursor-pointer" />
          </div>

          {openDropdown && (
            <div className="w-[250px] h-max shadow-2xl z-50 bg-white absolute top-16 p-5 rounded-md">
              <h1 className="font-semibold mb-4 text-xl flex justify-between">
                Change Location{" "}
                <span onClick={toggleDropdown} className="cursor-pointer">
                  <CgClose />
                </span>
              </h1>
              <button
                onClick={getLocation}
                className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400 w-full"
              >
                Detect my Location
              </button>
            </div>
          )}
        </div>

        {/* MOBILE: Logo only */}
        <Link to="/" className="md:hidden">
          <h1 className="font-bold text-2xl">
            <span className="text-red-500 font-serif">L</span>UX
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-7 items-center">
          <ul className="flex gap-7 items-center text-lg font-semibold">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-4 transition-all duration-300 border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Home</li>
            </NavLink>

            <NavLink
              to="/product"
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-4 transition-all duration-300 border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Products</li>
            </NavLink>
          </ul>

          <Link to="/cart" className="relative">
            <IoCartOutline className="h-7 w-7" />
            {cartItems.length > 0 && (
              <span className="bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white text-xs font-bold">
                {cartItems.length}
              </span>
            )}
          </Link>

          <div>
            <SignedOut>
              <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all duration-300 text-sm" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>

        {/* Mobile: Cart + Menu Button */}
        <div className="md:hidden flex gap-4 items-center">
          <Link to="/cart" className="relative">
            <IoCartOutline className="h-6 w-6" />
            {cartItems.length > 0 && (
              <span className="bg-red-500 px-1.5 rounded-full absolute -top-2 -right-2 text-white text-xs font-bold">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl focus:outline-none"
          >
            {mobileMenuOpen ? <CgClose /> : <RxHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-4">
            {/* Location Section */}
            <div className="mb-6 pb-6 border-b border-slate-200">
              <button
                onClick={toggleDropdown}
                className="flex gap-2 items-center text-slate-700 font-semibold w-full mb-3"
              >
                <MapPin className="text-red-500 w-5 h-5" />
                <span>
                  {location
                    ? `${location.county}, ${location.state}`
                    : "Add Address"}
                </span>
              </button>

              {openDropdown && (
                <button
                  onClick={() => {
                    getLocation();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-400 w-full text-sm"
                >
                  Detect my Location
                </button>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-4 mb-4">
              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-l-4 border-red-500 text-red-500"
                      : "text-black"
                  } pl-3 py-2 font-semibold text-lg transition`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/product"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-l-4 border-red-500 text-red-500"
                      : "text-black"
                  } pl-3 py-2 font-semibold text-lg transition`
                }
              >
                Products
              </NavLink>
            </nav>

            {/* Auth Section */}
            <div className="border-t border-slate-200 pt-4">
              <SignedOut>
                <SignInButton
                  onClick={closeMobileMenu}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300 w-full text-sm font-semibold"
                />
              </SignedOut>
              <SignedIn>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Account</span>
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
