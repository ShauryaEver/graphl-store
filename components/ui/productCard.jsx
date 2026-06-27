"use client";

import Image from "next/image";
import Link from "next/link";

function ProductCard({ product, onClick }) {
  const image =
    product?.thumbnail ??
    product?.image ??
    "/placeholder.jpg";

  const title =
    typeof product?.title === "string"
      ? product.title
      : "GRAPHL PRODUCT";

  const price = Number.isFinite(Number(product?.price))
    ? Math.floor(Number(product.price))
    : "999";

  return (
    <Link
  href={`/product/${product.id}`}
  className="group cursor-pointer block"
>
      <div
        className="
          overflow-hidden
          rounded-3xl
          bg-gray-100
        "
      >
        <Image
          src={image}
          alt={title}
          width={600}
          height={700}
          className="
            w-full
            h-[420px]
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />
      </div>

      <div className="pt-4">
        <h3
          className="
            text-lg
            font-semibold
            text-black
            tracking-tight
            line-clamp-1
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1
            text-xl
            font-bold
            text-black
          "
        >
          ₹{price}
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;