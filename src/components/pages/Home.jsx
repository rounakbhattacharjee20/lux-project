// src/pages/Home.jsx
import React from "react";
import HeroSwitcher from "../HeroSwitcher.jsx";
import { useUser } from "@clerk/clerk-react"; // Clerk hook

const Home = () => {
  const { user } = useUser(); // current logged‑in user

  // show either full name, username, or email
  const displayName =
    user?.fullName || user?.username || user?.primaryEmailAddress?.emailAddress || "Guest";

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

      {/* hero area on dark background, not full page */}
      <div className="bg-[#050816] pb-10">
        <HeroSwitcher />
      </div>

      {/* rest of page on light background */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Handpicked for you
        </h2>
        <p className="text-sm md:text-base text-slate-600">
          Explore curated collections designed for your store and your customers.
        </p>
      </section>
    </div>
  );
};

export default Home;
