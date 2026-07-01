"use client";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const cartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (
    product,
    selectedSize,
    selectedColor,
    quantity = 1
  ) => {
    setCartItems((prev) =>
      prev.some(
        (item) =>
          item.id === product.id &&
          item.size === selectedSize &&
          item.color === selectedColor
      )
        ? prev.map((item) =>
            item.id === product.id &&
            item.size === selectedSize &&
            item.color === selectedColor
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                }
              : item
          )
        : [
            ...prev,
            {
              id: product.id,
              title: product.title,
              image: product.images[0],
              price: product.price,
              size: selectedSize,
              color: selectedColor,
              quantity,
            },
          ]
    );

    toast.success(
      `${product.title} (${selectedColor}, Size ${selectedSize}) added to cart`
    );
  };

  const increaseQuantity = (id, size, color) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id &&
      item.size === size &&
      item.color === color
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    )
  );
};

  const decreaseQuantity = (id, size, color) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id &&
      item.size === size &&
      item.color === color &&
      item.quantity > 1
        ? {
            ...item,
            quantity: item.quantity - 1,
          }
        : item
    )
  );
};

  const removeItem = (id, size, color) => {
  setCartItems((prev) =>
    prev.filter(
      (item) =>
        !(
          item.id === id &&
          item.size === size &&
          item.color === color
        )
    )
  );
};

  const clearCart = () => {
  setCartItems([]);
};


   return (
    <cartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export function useCart() {
    const context = useContext(cartContext)
    if(!context){
        throw new Error("use Cart must be used inside cart provider")
    }
    return context
}
