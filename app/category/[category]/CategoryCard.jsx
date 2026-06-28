"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/components/ui/WishlistProvider";
import { useCart } from "@/app/cart/cartContext";
import { toast } from "react-toastify";

const getBadge = (product) => {
  if (product.badge) {
    const styles = {
      NEW: "bg-black text-white",
      LIMITED: "bg-orange-500 text-white",
      BESTSELLER: "bg-yellow-400 text-black",
      "LOW STOCK": "bg-red-500 text-white",
      TRENDING: "bg-blue-500 text-white",
    };
    return { label: product.badge, style: styles[product.badge] || "bg-black text-white" };
  }

  // Auto fallback if no badge set
  if (product.stock <= 10) return { label: "LOW STOCK", style: "bg-red-500 text-white" };
  if (product.stock <= 20) return { label: "LIMITED", style: "bg-orange-500 text-white" };
  if (product.reviews >= 200) return { label: "BESTSELLER", style: "bg-yellow-400 text-black" };
  if (product.featured) return { label: "TRENDING", style: "bg-blue-500 text-white" };
  return { label: "NEW", style: "bg-black text-white" };
};

export default function CategoryCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const badge = getBadge(product);

  return (
    <div className="group">
      {/* Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gray-100">
        {/* Product Link (Image Only) */}
        <Link href={`/product/${product.id}`}>
          <div className="relative h-[420px] overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </Link>

        {/* Dynamic Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className={`${badge.style} text-xs px-3 py-1 rounded-full font-semibold`}>
            {badge.label}
          </span>
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition"
        >
          <Heart
            size={18}
            fill={isWishlisted(product.id) ? "black" : "none"}
          />
        </button>

        {/* Quick Add */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition duration-300 z-20">
          <button
            type="button"
            onClick={() => {
              addToCart(
                product,
                product.sizes?.[1] || "M",
                product.colors?.[0]?.name || "Black",
                1
              );
              toast.success("Added to cart!");
            }}
            className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition"
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Info */}
      <Link href={`/product/${product.id}`}>
        <div className="pt-5">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
            GRAPHL®
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            {product.title}
          </h2>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-500">★★★★★</span>
            <span className="text-sm text-gray-500">
              {product.rating} ({product.reviews})
            </span>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <p className="text-2xl font-bold">₹{product.price}</p>
            {product.comparePrice && (
              <p className="text-gray-400 line-through">
                ₹{product.comparePrice}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}