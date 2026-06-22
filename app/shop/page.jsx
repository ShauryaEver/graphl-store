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
    <section className="w-full min-h-screen">
      <div className="mx-4 sm:mx-8 lg:mx-12 xl:mx-16 my-16 sm:my-20">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold my-4">
          Filter categories
        </h2>

        <div className="flex flex-wrap gap-3 my-6">
          {CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() => filterCategory(category.value)}
              className="rounded-2xl bg-slate-300 px-4 py-2 text-sm sm:text-base
                         hover:bg-slate-400 transition-colors"
            >
              {category.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="h-10 w-10 rounded-full border-4 border-gray-300 border-t-black animate-spin"></div>
          </div>
        )}

        <div
          className="
  grid
  grid-cols-1
  sm:grid-cols-2
  md:grid-cols-3
  xl:grid-cols-4
  gap-x-6
  gap-y-10
  my-10
  justify-items-center
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
