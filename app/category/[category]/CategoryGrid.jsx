import CategoryCard from "./CategoryCard";

export default function CategoryGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <CategoryCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}