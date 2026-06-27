"use client";

export default function SizeSelector({
  sizes = [],
  selectedSize,
  onSizeChange,
}) {
  return (
    <div className="space-y-3">

      <div className="flex justify-between items-center">

        <h3 className="text-lg font-semibold">
          Size
        </h3>

        <button className="text-sm text-gray-500 hover:text-black transition">
          Size Guide
        </button>

      </div>

      <div className="flex gap-3">

        {sizes.map((size) => (

          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`
              w-12
              h-12
              rounded-xl
              border
              font-semibold
              transition-all
              duration-300
              ${
                selectedSize === size
                  ? "bg-black text-white border-black"
                  : "bg-white border-gray-300 hover:border-black"
              }
            `}
          >
            {size}
          </button>

        ))}

      </div>

      <p className="text-gray-500">
        Selected: {selectedSize}
      </p>

    </div>
  );
}