import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";

export const CartProduct = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartProducts, addToCart, removeFromCart, updateCartProductCount } =
    useContext(ShopContext);
  const [inputValue, setInputValue] = useState(cartProducts[id] || 0);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    setInputValue(cartProducts[id] || 0);
    setIsInvalid(false);
  }, [cartProducts, id]);

  const isValidInput = (value) => {
    return /^\d+$/.test(value) && parseInt(value) >= 0;
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (isValidInput(value)) {
      updateCartProductCount(parseInt(value), id);
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }
  };

  const handleBlur = () => {
    const parsedValue = parseInt(inputValue);
    if (!isValidInput(inputValue) || isNaN(parsedValue)) {
      const lastValidValue = cartProducts[id] || 0;
      setInputValue(lastValidValue);
      updateCartProductCount(lastValidValue, id);
    } else {
      setInputValue(parsedValue);
      updateCartProductCount(parsedValue, id);
    }
    setIsInvalid(false);
  };

  return (
    <div className="cartProduct">
      <img src={productImage} alt={productName} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> Price: ${price}</p>
        <div className={`countHandler ${isInvalid ? 'invalid' : ''}`}>
          <button onClick={() => removeFromCart(id)} disabled={cartProducts[id] <= 0}> - </button>
          <input
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className={isInvalid ? 'invalid' : ''}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  );
};