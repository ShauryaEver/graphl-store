"use client";

export default function ColorSelector({
  colors = [],
  selectedColor,
  onColorChange,
}) {
  return (
    <div className="space-y-3">

      <h3 className="text-lg font-semibold">
        Color
      </h3>

      <div className="flex gap-4">

        {colors.map((color) => (

          <button
            key={color.name}
            onClick={() => onColorChange(color.name)}
            className={`
              w-10
              h-10
              rounded-full
              border-2
              transition-all
              duration-300
              ${
                selectedColor === color.name
                  ? "border-black scale-110"
                  : "border-gray-300"
              }
            `}
            style={{
              backgroundColor: color.hex,
            }}
          />

        ))}

      </div>

      <p className="text-gray-500">
        Selected: {selectedColor}
      </p>

    </div>
  );
}