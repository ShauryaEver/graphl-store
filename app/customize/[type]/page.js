"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

const PLAIN_MOCKUPS = [
  {
    id: "plain1",
    name: "Classic Fit",
    image: "/Plain1.jpg",
  },
  {
    id: "plain2",
    name: "Relaxed Fit",
    image: "/Plain2.jpg",
  },
  {
    id: "plain3",
    name: "Oversized Fit",
    image: "/Plain3.jpg",
  },
  {
    id: "plain4",
    name: "Studio Fit",
    image: "/Plain4.jpg",
  },
];

const PRODUCT_LABELS = {
  tshirt: "T-Shirt",
  hoodie: "Hoodie",
};

export default function CustomizeProductPicker() {
  const router = useRouter();
  const params = useParams();
  const type = params.type;

  const productLabel = PRODUCT_LABELS[type] || "Product";

  return (
    <main className="min-h-screen py-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col gap-3 mb-12">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-black transition flex items-center gap-1 w-fit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="14" height="14">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>

          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
            Custom Graphl
          </p>
          <h1 className="text-4xl sm:text-5xl font-black">
            Choose Your Blank {productLabel}
          </h1>
          <p className="text-gray-500 text-lg max-w-xl">
            Pick a fit to start designing. You'll be able to add your own graphics, text, and colors next.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PLAIN_MOCKUPS.map((mockup) => (
            <button
              key={mockup.id}
              onClick={() => router.push(`/editor/${type}?fit=${mockup.id}`)}
              className="group text-left"
            >
              <div className="relative w-full h-[360px] rounded-3xl overflow-hidden bg-white border border-gray-100 transition-all duration-300 group-hover:border-black group-hover:shadow-xl">
                <Image
                  src={mockup.image}
                  alt={mockup.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="bg-black text-white text-xs px-4 py-2 rounded-full font-medium">
                    Customize This →
                  </span>
                </div>
              </div>

              <h3 className="mt-4 text-base font-semibold">{mockup.name}</h3>
              <p className="text-sm text-gray-400">100% Premium Cotton</p>
            </button>
          ))}
        </div>

      </div>
    </main>
  );
}