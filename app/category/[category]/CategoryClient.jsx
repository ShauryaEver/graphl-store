"use client";
import CategoryHero from "./CategoryHero";
import CategoryToolbar from "./CategoryToolbar";
import CategoryGrid from "./CategoryGrid";

export default function CategoryClient({
  products,
  currentCategory,
}) {
  return (
  <main className="max-w-7xl mx-auto px-6 py-20">

    <CategoryHero
      currentCategory={currentCategory}
      products={products}
    />

    <CategoryToolbar
      products={products}
    />

    <CategoryGrid
      products={products}
    />

  </main>
);
}