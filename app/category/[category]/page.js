import graphlProducts from "@/lib/graphlProducts";
import CategoryClient from "./CategoryClient";

export default async function CategoryPage({ params }) {
  const { category } = await params;

  const products = graphlProducts.filter(
    (product) => product.category === category
  );

  const categoryInfo = {
    hoodies: {
      title: "Oversized Hoodies",
      description:
        "Heavyweight hoodies crafted for comfort, confidence and everyday streetwear.",
      image: "/products/hoodies/hoodie1.jpg",
    },

    tshirts: {
      title: "Oversized T-Shirts",
      description:
        "Premium oversized tees designed with minimal aesthetics and maximum comfort.",
      image: "/products/tshirts/tshirt1.jpg",
    },

    shirts: {
      title: "Premium Shirts",
      description:
        "Tailored essentials made for modern everyday style.",
      image: "/products/tshirts/tshirt2.jpg",
    },

    accessories: {
      title: "Accessories",
      description:
        "Complete your outfit with premium Graphl accessories.",
      image: "/products/tshirts/tshirt3.jpg",
    },
  };

  const currentCategory =
    categoryInfo[category] || {
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