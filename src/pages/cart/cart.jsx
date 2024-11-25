import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { CartProduct } from "./cart-product";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./cart.css";

export const Cart = () => {
  const { cartProducts, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  const itemCount = Object.values(cartProducts).reduce((a, b) => a + b, 0);

  return (
    <div className="cart">
      <div className="cartItems">
        <h1>Shopping Cart</h1>
        <div className="cart-headers">
          <span>Product Details</span>
          <span>Quantity</span>
          <span>Price</span>
          <span>Total</span>
        </div>
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
        <h2>Order Summary</h2>
        <div className="summary-row">
          <strong>Items</strong>
          <strong>{itemCount}</strong>
        </div>
        
        <div className="summary-row total-cost">
          <strong> Estimated Cost</strong>
          <strong>${totalAmount.toFixed(2)}</strong>
        </div>
        
        <div className="summary-buttons">
          <button className="continue-shopping-btn" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
          <button className="checkout-button" onClick={() => navigate("/checkout")}>
            Checkout
          </button>
        </div>
        </>
        ) : (
          <h2>Your Shopping Cart is Empty</h2>
        )}
      </div>
      <ToastContainer toastStyle={{ width: "500px" }} position="bottom-center" hideProgressBar={true} />
    </div>
  );
};