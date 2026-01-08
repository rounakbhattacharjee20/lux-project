// src/components/Footer.jsx

    import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#050816] text-gray-200 pt-12 pb-6 px-4">
      <div className="max-w-7xl mx-auto">
       
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4 pb-8 border-b border-gray-800">
        
          <div>
            <h3 className="text-xl font-bold text-red-500">LUX</h3>
            <p className="mt-2 text-sm text-gray-300">
              Enriching your experience with the best in style.
            </p>
            <p className="mt-3 text-sm text-gray-400">
              123 Electronics St, Style City, NY 10001
            </p>
            <p className="text-sm text-gray-400">
              Email: support@Lux.com
              <br />
              Phone: (+91) 98261-63500
            </p>
          </div>

        
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide mb-3">
              Customer Service
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Contact Us</li>
              <li>Shipping &amp; Returns</li>
              <li>FAQs</li>
              <li>Order Tracking</li>
              <li>Size Guide</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide mb-3">
              Follow Us
            </h4>
            <div className="flex items-center gap-3 text-gray-300 text-lg">
              <span>👍</span>
              <span>🐦</span>
              <span>📸</span>
              <span>▶️</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide mb-3">
              Stay in the Loop
            </h4>
            <p className="text-sm text-gray-400 mb-3">
              Subscribe to get special offers, free giveaways, and more.
            </p>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full p-2 rounded-l-md text-gray-200 bg-transparent border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-r-md hover:bg-red-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

       
        <div className="pt-4 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-red-500 font-semibold">LUX</span>. All rights
          reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
