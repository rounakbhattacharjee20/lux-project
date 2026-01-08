// src/components/Carousel.jsx
import React, { useEffect, useContext } from "react";
import { DataContext } from "../context/DataContext.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { Pause } from "lucide-react";
import Category from "./Category.jsx";

const Carousel = () => {
  const ctx = useContext(DataContext);

  if (!ctx) {
    return <div>Carousel: no DataProvider found</div>;
  }

  const { data, fetchAllProducts } = ctx;

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // shared arrow base classes: translucent, only strong on hover
  const ArrowBase =
    "hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/40 text-white " +
    "bg-white/5 hover:bg-[#f53347] hover:border-transparent hover:shadow-lg " +
    "backdrop-blur-sm transition opacity-40 hover:opacity-100";

  const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${ArrowBase} absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20`}
      >
        <AiOutlineArrowLeft className="text-lg" />
      </button>
    );
  };

  const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${ArrowBase} absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20`}
      >
        <AiOutlineArrowRight className="text-lg" />
      </button>
    );
  };

  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="p-4">
      <Slider {...settings}>
        {data && data.length > 0 ? (
          data.slice(0, 7).map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-[#1a0007] via-[#ff416c] to-[#ff4b2b] -z-10"
            >
              <div className="flex justify-center h-[500px] md:h-[600px] items-center px-4 gap-10">
                {/* text side */}
                <div className="max-w-3xl mx-auto space-y-4 md:space-y-6 text-center md:text-left">
                  <h2 className="text-white text-3xl md:text-4xl font-extrabold tracking-wide">
                    {item.title}
                  </h2>

                  <p className="text-sm md:text-base text-pink-100/90 md:w-[550px] mx-auto md:mx-0 line-clamp-3">
                    {item.description}
                  </p>

                  {/* pill + shop button row */}
                  <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
                    <h3 className="px-6 py-3 rounded-full bg-white/10 border border-white/30 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-pink-50">
                      Funky styles. Fresh vibes.
                    </h3>

                    <button
                      className="
                        relative inline-flex items-center justify-center
                        px-8 py-3 rounded-full
                        bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600
                        text-white text-sm md:text-base font-semibold tracking-wide
                        shadow-lg shadow-pink-500/40
                        transition-all duration-300 ease-out
                        hover:shadow-pink-500/70
                        hover:scale-110 hover:-translate-y-0.5
                        focus:outline-none focus:ring-2 focus:ring-fuchsia-400/80 focus:ring-offset-2
                        animate-pulse
                      "
                    >
                      Shop Now
                    </button>
                  </div>
                </div>

                {/* image side */}
                <img
                  src={
                    item.images && item.images.length > 0 ? item.images[0] : ""
                  }
                  alt={item.title}
                  className="rounded-full w-[260px] md:w-[420px] h-[260px] md:h-[420px] object-cover shadow-2xl hover:scale-105 transition-all duration-300"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-[300px] bg-slate-900 text-white">
            <h3>Loading products...</h3>
          </div>
        )}
      </Slider>
      <Category/>
    </div>
  );
};

export default Carousel;
// End of src/components/Carousel.jsx
