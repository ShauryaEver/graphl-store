"use client";
console.log("WishlistProvider loaded");

import { createContext, useContext, useState } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {

  const [wishlistItems, setWishlistItems] = useState([]);

  const toggleWishlist = (product) => {

    setWishlistItems((prev) => {

      const exists = prev.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return prev.filter(
          (item) => item.id !== product.id
        );
      }

      return [...prev, product];

    });

  };

  const isWishlisted = (id) => {

    return wishlistItems.some(
      (item) => item.id === id
    );

  };

  return (

    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isWishlisted,
      }}
    >

      {children}

    </WishlistContext.Provider>

  );

}

export function useWishlist() {

  const context = useContext(WishlistContext);

  if (!context) {

    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );

  }

  return context;

}