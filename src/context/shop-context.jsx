import { createContext, useState } from "react";
import { PRODUCTS } from "../products";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [categoryFilter, setCategoryFilter] = useState("");

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const Product in cartProducts) {
      if (cartProducts[Product] > 0) {
        let ProductInfo = PRODUCTS.find((product) => product.id === Number(Product));
        totalAmount += cartProducts[Product] * ProductInfo.price;
      }
    }
    return Number(totalAmount.toFixed(2)); // Round to 2 decimal places
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
    let removedProduct = PRODUCTS.find((product) => product.id === ProductId);
    setWishList((prevWishList) =>
      prevWishList.filter(id => id !== ProductId) // Remove the product by filtering it out
    );
    toast(<div><span className="toast-message">Removed {removedProduct.productName} from wishlist</span> <span className="toast-action"><button onClick={() => { undoRemoveFromWishList(removedProduct.id); toast.dismiss(); }}>Undo</button></span></div>);
  };

  const undoRemoveFromWishList = (removedProductId) => { addToWishList(removedProductId) };
  const undoRemoveFromCart = (removedProductId) => { addToCart(removedProductId) };

  const isProductInWishList = (ProductId) => wishList.includes(ProductId);

  const addToCart = (ProductId) => {
    setCartProducts((prev) => ({ ...prev, [ProductId]: (prev[ProductId] || 0) + 1 }));
  };

  const removeFromCart = (ProductId) => {
    let currentQty = cartProducts[ProductId];
    setCartProducts((prev) => ({
      ...prev,
      [ProductId]: Math.max(0, prev[ProductId] - 1)
    }));
    if (currentQty === 1) {
      let removedProduct = PRODUCTS.find((product) => product.id === ProductId);
      toast(<div><span className="toast-message">Removed {removedProduct.productName} from cart</span> <span className="toast-action"><button onClick={() => { undoRemoveFromCart(removedProduct.id); toast.dismiss(); }}>Undo</button></span></div>);
    }
  };

  const updateCartProductCount = (newAmount, ProductId) => {
    setCartProducts((prev) => ({
      ...prev,
      [ProductId]: Math.max(0, newAmount)
    }));
  };

  const checkout = () => {
    setCartProducts(getDefaultCart());
  };
  const updateCategoryFilter = (category) => {
    setCategoryFilter(category);
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
    categoryFilter,
    updateCategoryFilter
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};