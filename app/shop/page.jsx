"use client";

import { useState } from "react";
import graphlProducts from "@/lib/graphlProducts";
import CategoryCard from "@/app/category/[category]/CategoryCard";

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Hoodies", value: "hoodies" },
  { label: "Oversized Tshirts", value: "tshirts" },
  { label: "Streetwear", value: "streetwear" },
  { label: "SPL Edition", value: "spl-edition" },
];

const Page = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? graphlProducts
      : graphlProducts.filter((p) => p.category === activeCategory);

  return (
    <section className="w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-center tracking-tight">
          THE LOOKBOOK
        </h1>

        <p className="text-center text-gray-500 mt-4 mb-12">
          Every drop. Every style. Only Graphl.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`px-6 py-3 rounded-full border font-medium transition-all duration-300 ${
                activeCategory === category.value
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-black hover:bg-black hover:text-white"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-400 text-lg mt-20">
            No products found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <CategoryCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Page;