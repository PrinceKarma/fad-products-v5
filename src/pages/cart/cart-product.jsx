import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const CartProduct = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartProducts, addToCart, removeFromCart, updateCartProductCount } =
    useContext(ShopContext);

  return (
    <div className="cartProduct">
      <img src={productImage} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> Price: ${price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={cartProducts[id]}
            onChange={(e) => updateCartProductCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  );
};