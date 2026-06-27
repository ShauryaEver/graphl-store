import graphlProducts from "@/lib/graphlProducts";
import ProductInfo from "@/components/ui/ProductInfo";
import ProductGallery from "@/components/ui/ProductGallery";
import ProductTabs from "@/components/ui/ProductTabs";

export default async function ProductPage({ params }) {

  const { id } = await params;

  const res = await fetch(
    `https://dummyjson.com/products/${id}`,
    {
      cache: "no-store",
    }
  );

  const apiProduct = await res.json();

const graphlProduct = graphlProducts.find(
  (item) => item.id === Number(id)
);

const product = graphlProduct
  ? {
      ...apiProduct,
      ...graphlProduct,
    }
  : {
      ...apiProduct,
      colors: [
        { name: "Black", hex: "#111111" },
      ],
      sizes: ["M"],
      rating: 4.8,
      reviews: 120,
    };

  return (
    <main className="min-h-screen bg-white py-16 px-6">
      <main className="min-h-screen bg-white py-16 px-6">

  <div className="max-w-7xl mx-auto">

    <div className="grid lg:grid-cols-2 gap-16 items-start">

      <ProductGallery images={product.images} />

      <ProductInfo product={product} />

    </div>

    <ProductTabs product={product} />

  </div>

</main>
    </main>
  );
}