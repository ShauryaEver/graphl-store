"use client";

import { useState } from "react";

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = {
    description: product.description,

    details:
      "Premium heavyweight cotton • Oversized fit • 420 GSM • Ribbed cuffs • Made for everyday comfort.",

    shipping:
      "Free shipping on orders above ₹999. Easy 30-day returns. Delivery within 3–7 business days.",

    care:
      "Machine wash cold. Do not bleach. Tumble dry low. Iron inside out."
  };

  return (
    <div className="mt-20">

      <div className="flex gap-10 border-b pb-4">

        {Object.keys(tabs).map((tab) => (

          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`uppercase tracking-wider text-sm font-semibold transition

            ${
              activeTab === tab
                ? "text-black border-b-2 border-black pb-4"
                : "text-gray-400 hover:text-black"
            }`}
          >
            {tab}
          </button>

        ))}

      </div>

      <div className="pt-8 max-w-3xl leading-8 text-gray-600">

        {tabs[activeTab]}

      </div>

    </div>
  );
}