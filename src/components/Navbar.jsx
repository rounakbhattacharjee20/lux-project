import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MapPin } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";

const Navbar = () => {
  const location = false;

  return (
    <div className="bg-white py-3 shadow-2xl">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo + address */}
        <div className="flex gap-7 items-center">
          <Link to="/">
            <h1 className="font-bold text-3xl">
              <span className="text-red-500 font-serif">L</span>UX
            </h1>
          </Link>

          <div className="flex gap-1 cursor-pointer text-grey-700 items-center">
            <MapPin className="text-red-500" />
            <span className="font-semibold">
              {location ? <div /> : "Add Address"}
            </span>
            <FaCaretDown />
          </div>
        </div>

        {/* Menu Section */}
        <nav>
          <ul className="flex gap-7 items-center text-xl font-semibold">
            <NavLink to= "/" className={({isActive}) => `${isActive ? "border-b-3 transition-all duration-300 border-red-500" : "text-black"} cursor-pointer`}>

              <li>Home</li>
            </NavLink>
            <NavLink to= "/product" className={({isActive}) => `${isActive ? "border-b-3 transition-all- duration-300 border-red-500" : "text-black"} cursor-pointer`}>
              <li>Products</li>
            </NavLink>
            <NavLink to= "/about" className={({isActive}) => `${isActive ? "border-b-3 transition-all duration-300 border-red-500" : "text-black"} cursor-pointer`}>
              <li>About</li>
              </NavLink>

            <NavLink to= "/contact" className={({isActive}) => `${isActive ? "border-b-3 transition-all duration-300 border-red-500" : "text-black"} cursor-pointer`}>
              <li>Contact</li>
            </NavLink>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
