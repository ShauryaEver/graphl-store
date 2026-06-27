"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(
    images[0] || "/placeholder.jpg"
  );

  return (
    <div className="flex gap-6">
      {/* Thumbnails */}
      <div className="flex flex-col gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`border rounded-xl overflow-hidden ${
              selectedImage === image
                ? "border-black"
                : "border-gray-300"
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              width={80}
              height={80}
              className="w-20 h-20 object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1">
        <Image
          src={selectedImage}
          alt="Selected Product"
          width={700}
          height={800}
          className="w-full rounded-3xl object-cover"
        />
      </div>
    </div>
  );
}