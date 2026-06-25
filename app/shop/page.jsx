"use client";

import { useEffect, useState } from "react";
import dummyData from "../dummyData";
import ProductCard from "@/components/ui/productCard";
import PreviewCard from "@/components/ui/previewCard";

const Page = () => {
  const CATEGORIES = [
    { label: "Men Shirts", value: "mens-shirts" },
    { label: "Women Dresses", value: "womens-dresses" },
    { label: "Men Shoes", value: "mens-shoes" },
    { label: "Women Bags", value: "womens-bags" },
  ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filterCategory = async (categoryValue) => {
    setLoading(true);

    const result = await dummyData(categoryValue);

    if (result?.products) {
      setProducts(result.products);
    } else {
      setProducts([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    filterCategory("mens-shirts");
  }, []);

  return (
    <section className="w-full min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-center tracking-tight">
          SHOP
        </h1>

        <p className="text-center text-gray-500 mt-4 mb-12">
          Premium Essentials by Graphl
        </p>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() => filterCategory(category.value)}
              className="
                px-6
                py-3
                rounded-full
                border
                border-black
                bg-white
                text-black
                font-medium
                hover:bg-black
                hover:text-white
                transition-all
                duration-300
              "
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Loader */}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="h-10 w-10 rounded-full border-4 border-gray-300 border-t-black animate-spin"></div>
          </div>
        )}

        {/* Products Grid */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-12
          "
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                price: product.price * 100,
                sizes: ["S", "M", "L", "XL"],
              }}
              onClick={setSelectedProduct}
            />
          ))}
        </div>
      </div>

      <PreviewCard
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};

export default Page;