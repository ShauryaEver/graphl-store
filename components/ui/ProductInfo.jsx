"use client";

import { useState } from "react";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import AddToCartButton from "./AddToCartButton";

export default function ProductInfo({ product }) {

  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  // Quantity Functions
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };


  return (
    <div className="space-y-6">

      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
          {product.brand || "GRAPHL"}®
        </p>

        <h1 className="text-5xl font-bold mt-2">
          {product.title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
  <span className="text-yellow-500 text-xl">
    ★★★★★
  </span>

  <span className="text-gray-500">
    {product.rating} ({product.reviews} Reviews)
  </span>
</div>

      <div className="flex items-center gap-4">

  <h2 className="text-4xl font-bold">
    ₹{product.price}
  </h2>

  {product.comparePrice && (
    <span className="text-2xl text-gray-400 line-through">
      ₹{product.comparePrice}
    </span>
  )}

</div>

      <ColorSelector
        colors={product.colors}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />

      <SizeSelector
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
      />

      <QuantitySelector
        quantity={quantity}
        increase={increaseQuantity}
        decrease={decreaseQuantity}
      />
      <AddToCartButton
       product={product}
       selectedColor={selectedColor}
       selectedSize={selectedSize}
       quantity={quantity}
     />

      <p className="text-gray-600 leading-7 max-w-xl">
        {product.description}
      </p>

      <div className="grid grid-cols-3 gap-4 text-center border rounded-2xl p-6">
        <div>
          <h3 className="font-semibold">
            Free Shipping
          </h3>
        </div>

        <div>
          <h3 className="font-semibold">
            30 Day Returns
          </h3>
        </div>

        <div>
          <h3 className="font-semibold">
            Secure Checkout
          </h3>
        </div>
      </div>

    </div>
  );
}