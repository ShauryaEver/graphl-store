import graphlProducts from "@/lib/graphlProducts";
import CategoryClient from "@/app/category/[category]/CategoryClient";

export default async function TrendingPage({ params }) {
  const { category } = await params;

  // Only featured/trending products for this category
  const products = graphlProducts.filter(
    (product) => product.category === category && product.featured === true
  );

  const categoryInfo = {
    hoodies: {
      title: "Trending Hoodies",
      description: "Our most loved hoodies right now.",
      image: "/products/hoodies/hoodie1.jpg",
    },
    tshirts: {
      title: "Trending T-Shirts",
      description: "The tees everyone's wearing this season.",
      image: "/products/tshirts/tshirt1.jpg",
    },
    streetwear: {
      title: "Trending Streetwear",
      description: "What the streets are saying right now.",
      image: "/products/tshirts/tshirt2.jpg",
    },
    "spl-edition": {
      title: "Trending SPL Drops",
      description: "Limited. Exclusive. Selling fast.",
      image: "/products/tshirts/tshirt3.jpg",
    },
  };

  const currentCategory = categoryInfo[category] || {
    title: category,
    description: "",
    image: "",
  };

  return <CategoryClient products={products} currentCategory={currentCategory} />;
}