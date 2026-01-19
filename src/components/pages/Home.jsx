// src/pages/Home.jsx

import React, { useEffect } from "react";
import HeroSwitcher from "../HeroSwitcher.jsx";
import { useUser } from "@clerk/clerk-react";
import { getData } from "../../context/DataContext.jsx";

const Home = () => {
  const { user } = useUser();
  const { fetchAllProducts } = getData();

  const displayName =
    user?.fullName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress ||
    "Guest";

  useEffect(() => {
    // still load products once so the rest of the app has data
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* thin trader bar */}
      <div className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white text-xs md:text-sm">
        <div className="max-w-6xl mx-auto px-4 py-1 flex items-center justify-between">
          <span className="font-semibold tracking-wide">LUX Partner Portal</span>
          <span className="opacity-90">
            Trader: <span className="font-semibold">{displayName}</span>
          </span>
        </div>
      </div>

      {/* hero / categories take the whole visible page width */}
      <div className="bg-[#050816] min-h-[calc(100vh-40px)] pb-10">
        <HeroSwitcher />
      </div>
    </div>
  );
};

export default Home;
