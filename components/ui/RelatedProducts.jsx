"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useWishlist } from "./WishlistProvider";
import graphlProducts from "@/lib/graphlProducts";

export default function RelatedProducts({ currentProductId, currentCategory }) {
  const scrollRef = useRef(null);
  const { toggleWishlist, isWishlisted } = useWishlist();

  // Get 6 related products — same category first, then fill with others
  const sameCategory = graphlProducts.filter(
    (p) => p.category === currentCategory && p.id !== currentProductId
  );
  const others = graphlProducts.filter(
    (p) => p.category !== currentCategory && p.id !== currentProductId
  );
  const relatedProducts = [...sameCategory, ...others].slice(0, 6);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  const getBadge = (product) => {
    if (product.stock <= 10) return { label: "LOW STOCK", style: "bg-red-500 text-white" };
    if (product.stock <= 20) return { label: "LIMITED", style: "bg-orange-500 text-white" };
    if (product.reviews >= 200) return { label: "BESTSELLER", style: "bg-yellow-400 text-black" };
    if (product.featured) return { label: "TRENDING", style: "bg-blue-500 text-white" };
    return { label: "NEW", style: "bg-black text-white" };
  };

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-24 relative">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Customers Also Buy</h2>
        <Link
          href="/shop"
          className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all duration-300"
        >
          View all
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="14" height="14">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12L13.5 19.5M21 12H3" />
          </svg>
        </Link>
      </div>

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 -translate-x-4 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:scale-110 transition hidden lg:flex"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 translate-x-4 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:scale-110 transition hidden lg:flex"
      >
        <ChevronRight size={18} />
      </button>

      {/* Sliding Row */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {relatedProducts.map((product) => {
          const badge = getBadge(product);
          return (
            <div
              key={product.id}
              className="min-w-[220px] sm:min-w-[240px] shrink-0 group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gray-100">

                <Link href={`/product/${product.id}`}>
                  <div className="relative h-[280px] overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </Link>

                {/* Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className={`${badge.style} text-[10px] px-2.5 py-1 rounded-full font-semibold`}>
                    {badge.label}
                  </span>
                </div>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition"
                >
                  <Heart
                    size={14}
                    className="text-red-500"
                    fill={isWishlisted(product.id) ? "#ef4444" : "none"}
                  />
                </button>

              </div>

              {/* Info */}
              <Link href={`/product/${product.id}`}>
                <div className="pt-3">
                  <h3 className="text-sm font-semibold truncate">{product.title}</h3>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-sm font-bold">₹{product.price}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span className="text-yellow-500">★</span>
                      {product.rating}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

    </div>
  );
}