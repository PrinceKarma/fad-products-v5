import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { CartProduct } from "./cart-product";
import { useNavigate } from "react-router-dom";
import "./cart.css";

export const Cart = () => {
  const { cartProducts, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cartItems">
        <h1>Shopping Cart</h1>
        {PRODUCTS.map((product) => {
          if (cartProducts[product.id] !== 0) {
            return <CartProduct data={product} key={product.id} />;
          }
          return null;
        })}
      </div>

      <div className="cartSummary">
        {totalAmount > 0 ? (
          <>
            <h2>Cart Summary</h2>
            <p>Total Items: {Object.values(cartProducts).reduce((a, b) => a + b, 0)}</p>
            <p>Total Amount: ${totalAmount.toFixed(2)}</p>
            <button onClick={() => navigate("/")}>Continue Shopping</button>
            <button onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
          </>
        ) : (
          <h2>Your Shopping Cart is Empty</h2>
        )}
      </div>
    </div>
  );
};
