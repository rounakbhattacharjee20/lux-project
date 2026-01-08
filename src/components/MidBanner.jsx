// src/components/MidBanner.jsx
import React from "react";
import banner from "../assets/banner.jpg";

const MidBanner = () => {
  return (
    <section className="bg-[#f3f4f6] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="relative overflow-hidden rounded-3xl shadow-2xl group"
          style={{
            backgroundImage: `url(${banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* gradient + dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/0" />

          {/* subtle zoom on hover */}
          <div
            className="absolute inset-0 scale-105 transform transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: `url(${banner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0,
            }}
          />

          {/* content */}
          <div className="relative z-10 px-8 md:px-12 lg:px-16 py-10 md:py-16 flex items-center">
            <div className="max-w-xl bg-black/40 backdrop-blur-md rounded-2xl px-6 md:px-8 py-6 md:py-8 border border-white/15">
              <p className="text-xs tracking-[0.25em] text-pink-200 uppercase mb-3">
                New drop • Limited time
              </p>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                New styles at your fingertips
              </h2>

              <p className="text-sm md:text-base text-gray-100/90 mb-6">
                Discover the latest streetwear and everyday essentials, curated
                for bold, effortless looks all season.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  className="
                    inline-flex items-center justify-center
                    px-6 md:px-7 py-2.5 md:py-3 rounded-full
                    bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600
                    text-white text-sm md:text-base font-semibold tracking-wide
                    shadow-lg shadow-pink-500/40
                    transition-all duration-300 ease-out
                    hover:shadow-pink-500/70
                    hover:scale-105 hover:-translate-y-0.5
                    focus:outline-none focus:ring-2 focus:ring-pink-400/80 focus:ring-offset-2 focus:ring-offset-black/30
                  "
                >
                  Shop the collection
                </button>

               {/* <button className="text-xs md:text-sm font-semibold text-gray-200 hover:text-white transition">
                  View lookbook →
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MidBanner;
