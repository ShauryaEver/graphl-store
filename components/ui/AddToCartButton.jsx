"use client";

import { useState } from "react";
import { ShoppingBag, CheckCircle2 } from "lucide-react";
import { useCart } from "@/app/cart/cartContext";

export default function AddToCartButton({
  product,
  selectedColor,
  selectedSize,
  quantity,
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={added}
      style={{
        backgroundColor: added ? "#059669" : "#000000",
      }}
      className="
        mt-8
        w-full
        h-16
        rounded-2xl
        text-lg
        font-semibold
        text-white
        flex
        items-center
        justify-center
        gap-3
        transition-colors
        duration-300
      "
      onMouseEnter={(e) => {
        if (!added) e.currentTarget.style.backgroundColor = "#262626";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = added ? "#059669" : "#000000";
      }}
    >
      {added ? (
        <>
          <CheckCircle2 size={22} />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingBag size={22} />
          Add to Cart
        </>
      )}
    </button>
  );
}