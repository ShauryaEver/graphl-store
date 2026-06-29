"use client";

import { useWishlist } from "@/components/ui/WishlistProvider";
import { useCart } from "@/app/cart/cartContext";
import { Heart, X, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

export default function WishlistDrawer({ open, onClose }) {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Heart size={20} fill="black" />
            <h2 className="text-lg font-semibold tracking-wide">Wishlist</h2>
            <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full">
              {wishlistItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <Heart size={48} className="text-gray-200" />
              <p className="text-gray-400 text-sm">Your wishlist is empty.</p>
              <Link
                href="/shop"
                onClick={onClose}
                className="text-sm font-medium underline underline-offset-4 hover:text-gray-600 transition"
              >
                Browse the Lookbook →
              </Link>
            </div>
          ) : (
            wishlistItems.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition group"
              >
                {/* Image */}
                <Link href={`/product/${product.id}`} onClick={onClose}>
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">GRAPHL®</p>
                  <h3 className="text-sm font-semibold mt-0.5 truncate">{product.title}</h3>
                  <p className="text-sm font-bold mt-1">₹{product.price}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => {
                        addToCart(
                          product,
                          product.sizes?.[1] || "M",
                          product.colors?.[0]?.name || "Black",
                          1
                        );
                        toast.success("Added to cart!");
                      }}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-black text-white rounded-full hover:bg-gray-800 transition"
                    >
                      <ShoppingBag size={11} />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="text-xs px-3 py-1.5 rounded-full border border-gray-200 hover:border-red-300 hover:text-red-400 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100">
            <Link
              href="/shop"
              onClick={onClose}
              className="block w-full text-center py-3.5 rounded-2xl border border-black text-sm font-medium hover:bg-black hover:text-white transition duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </>
  );
}