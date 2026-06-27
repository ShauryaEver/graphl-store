import graphlProducts from "@/lib/graphlProducts";
import Link from "next/link";
import Image from "next/image";

export default async function CategoryPage({ params }) {
  const { category } = await params;

  const products = graphlProducts.filter(
    (product) => product.category === category
  );

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">

      <h1 className="text-5xl font-bold capitalize mb-12">
        {category}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {products.map((product) => (

          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group"
          >

            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-gray-100">

              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />

            </div>

            <h2 className="mt-4 text-xl font-semibold">
              {product.title}
            </h2>

            <p className="text-lg font-bold">
              ₹{product.price}
            </p>

          </Link>

        ))}

      </div>

    </main>
  );
}