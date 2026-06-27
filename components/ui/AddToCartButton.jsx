"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/app/cart/cartContext";

export default function AddToCartButton({
  product,
  selectedColor,
  selectedSize,
  quantity,
}) {
    const { addToCart } = useCart();

  const handleAddToCart = () => {
  addToCart(
    product,
    selectedSize,
    selectedColor,
    quantity
  );
};

  return (
    <button
      onClick={handleAddToCart}
      className="
        mt-8
        w-full
        h-16
        rounded-2xl
        bg-black
        text-white
        text-lg
        font-semibold
        flex
        items-center
        justify-center
        gap-3
        hover:bg-neutral-800
        transition-all
        duration-300
      "
    >
      <ShoppingBag size={22} />

      Add to Cart
    </button>
  );
}