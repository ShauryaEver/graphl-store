import graphlProducts from "@/lib/graphlProducts";
import CategoryClient from "@/app/category/[category]/CategoryClient";

export default async function CollectionPage({ params }) {
  const { category } = await params;

  const products = graphlProducts.filter(
    (product) => product.category === category
  );

  const categoryInfo = {
    hoodies: {
      title: "Premium Hoodies",
      description: "Heavyweight hoodies crafted for comfort and everyday streetwear.",
      image: "/products/hoodies/hoodie1.jpg",
    },
    tshirts: {
      title: "Oversized T-Shirts",
      description: "Premium oversized tees designed with minimal aesthetics.",
      image: "/products/tshirts/tshirt1.jpg",
    },
    streetwear: {
      title: "Streetwear",
      description: "Statement pieces built for the streets.",
      image: "/products/tshirts/tshirt2.jpg",
    },
    "spl-edition": {
      title: "Graphl #SPL Edition",
      description: "Exclusive drops. Limited runs. Only for the bold.",
      image: "/products/tshirts/tshirt3.jpg",
    },
  };

  const currentCategory = categoryInfo[category] || {
    title: category,
    description: "",
    image: "",
  };

  return (
    <CategoryClient
      products={products}
      currentCategory={currentCategory}
    />
  );
}