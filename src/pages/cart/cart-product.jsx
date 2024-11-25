import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/shop-context";
import { Link } from "react-router-dom";

export const CartProduct = (props) => {
  const { id, productName, price, productImage, category } = props.data;
  const { cartProducts, addToCart, removeFromCart, updateCartProductCount } =
    useContext(ShopContext);
  const [inputValue, setInputValue] = useState(cartProducts[id] || 0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    setInputValue(cartProducts[id] || 0);
    setErrorMessage("");
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
      setErrorMessage("");
      setIsInvalid(false);
    } else {
      setErrorMessage("Please enter a non-negative whole number.");
      setIsInvalid(true);
    }
  };

  const handleBlur = () => {
    if (!isValidInput(inputValue)) {
      const lastValidValue = cartProducts[id] || 0;
      setInputValue(lastValidValue);
      updateCartProductCount(lastValidValue, id);
      setErrorMessage("Invalid input. Please enter a non-negative whole number.");
      setIsInvalid(false);
    } else {
      updateCartProductCount(parseInt(inputValue), id);
      setErrorMessage("");
      setIsInvalid(false);
    }
  };

  return (
    <div className="cartProduct">
      <div className="product-details">
      <Link to={`/product/${id}`}><img src={productImage} alt={productName} /></Link>
        <div className="description">
          <b>{productName}</b>
          <p>{category}</p>
        </div>
      </div>
      
      <div className="countHandler">
        <button onClick={() => removeFromCart(id)} disabled={cartProducts[id] <= 0}> - </button>
        <input
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className={isInvalid ? 'invalid' : ''}
          aria-invalid={isInvalid}
          aria-describedby={`error-message-${id}`}
        />
        <button onClick={() => addToCart(id)}> + </button>
      </div>
      
      <div className="price">${price}</div>
      <div className="total">${(price * cartProducts[id]).toFixed(2)}</div>
      
      {errorMessage && (
        <p id={`error-message-${id}`} className="error-message">
          {errorMessage}
        </p>
      )}
    </div>
  );
};