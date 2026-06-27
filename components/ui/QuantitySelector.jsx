"use client";

export default function QuantitySelector({
  quantity,
  increase,
  decrease,
}) {
  return (
    <div className="space-y-3">

      <h3 className="text-lg font-semibold">
        Quantity
      </h3>

      <div className="flex items-center w-fit border rounded-2xl overflow-hidden">

        <button
          onClick={decrease}
          className="w-14 h-14 text-2xl hover:bg-gray-100 transition"
        >
          −
        </button>

        <div className="w-16 text-center font-semibold text-lg">
          {quantity}
        </div>

        <button
          onClick={increase}
          className="w-14 h-14 text-2xl hover:bg-gray-100 transition"
        >
          +
        </button>

      </div>

    </div>
  );
}