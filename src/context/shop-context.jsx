import { createContext, useEffect, useState } from "react";
import { PRODUCTS } from "../products";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartProducts, setCartProducts] = useState(getDefaultCart());
  const [wishList, setWishList] = useState([]);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const Product in cartProducts) {
      if (cartProducts[Product] > 0) {
        let ProductInfo = PRODUCTS.find((product) => product.id === Number(Product));
        totalAmount += cartProducts[Product] * ProductInfo.price;
      }
    }
    return totalAmount;
  };


  const addToWishList = (ProductId) => {
    setWishList((prevWishList) => {
      if (!prevWishList.includes(ProductId)) {
        return [...prevWishList, ProductId];
      }
      return prevWishList; // If the product is already in the wishlist, return the same list.
    });
  };

  const removeFromWishList = (ProductId) => {
    setWishList((prevWishList) =>
      prevWishList.filter(id => id !== ProductId) // Remove the product by filtering it out
    );
  };

  const isProductInWishList = (ProductId) => wishList.includes(ProductId);


  const addToCart = (ProductId) => {
    setCartProducts((prev) => ({ ...prev, [ProductId]: prev[ProductId] + 1 }));
  };

  const removeFromCart = (ProductId) => {
    setCartProducts((prev) => ({ ...prev, [ProductId]: prev[ProductId] - 1 }));
  };

  const updateCartProductCount = (newAmount, ProductId) => {
    setCartProducts((prev) => ({ ...prev, [ProductId]: newAmount }));
  };

  const checkout = () => {
    setCartProducts(getDefaultCart());
  };

  const contextValue = {
    addToWishList,
    removeFromWishList,
    isProductInWishList,
    wishList,
    cartProducts,
    addToCart,
    updateCartProductCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};