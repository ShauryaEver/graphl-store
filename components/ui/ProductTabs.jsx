"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const tabs = {
    description: product.description,
    details:
      "Premium heavyweight cotton • Oversized fit • 420 GSM • Ribbed cuffs • Made for everyday comfort.",
    shipping:
      "Free shipping on orders above ₹999. Easy 30-day returns. Delivery within 3–7 business days.",
    care:
      "Machine wash cold. Do not bleach. Tumble dry low. Iron inside out.",
  };

  return (
    <div className="mt-20">

      {/* Tabs + Size Guide Button */}
      <div className="flex items-end justify-between border-b pb-4">

        {/* Tabs */}
        <div className="flex gap-10">
          {Object.keys(tabs).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`uppercase tracking-wider text-sm font-semibold transition ${
                activeTab === tab
                  ? "text-black border-b-2 border-black pb-4"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Size Guide Button */}
        <button
          onClick={() => setSizeGuideOpen(true)}
          className="flex items-center gap-2 text-sm font-medium border border-black px-4 py-2 rounded-full hover:bg-black hover:text-white transition duration-300 mb-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
          </svg>
          Size Guide
        </button>

      </div>

      {/* Tab Content */}
      <div className="pt-8 max-w-3xl leading-8 text-gray-600">
        {tabs[activeTab]}
      </div>

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setSizeGuideOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">

              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <h2 className="text-lg font-bold tracking-wide uppercase">Size Guide</h2>
                <button
                  onClick={() => setSizeGuideOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Size Chart Image */}
              <div className="p-6">
                <div className="relative w-full rounded-2xl overflow-hidden">
                  <Image
                    src="/size-guide.png"
                    alt="Size Guide"
                    width={600}
                    height={800}
                    className="w-full h-auto object-contain"
                  />
                </div>

                <p className="text-xs text-gray-400 text-center mt-4">
                  Measurements are product specific. When in doubt, size up.
                </p>
              </div>

            </div>
          </div>
        </>
      )}

    </div>
  );
}