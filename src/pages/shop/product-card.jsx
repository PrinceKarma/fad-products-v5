import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import { Heart } from 'phosphor-react';

export const Product = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { addToCart, cartProducts, addToWishList, removeFromWishList, isProductInWishList } = useContext(ShopContext);

  const cartProductCount = cartProducts[id];
  const isInWishlist = isProductInWishList(id);

  return (
    <div className="product">
      <Link to={`/product/${id}`}>
        <img src={productImage} alt={productName} />
        <div className="description">
          <p><b>{productName}</b></p>
          <p>${price}</p>
        </div>
      </Link>
      <span className="productActions">
        <button className="addToCartBttn" onClick={() => addToCart(id)}>
          Add To Cart {cartProductCount > 0 && <> ({cartProductCount})</>}
        </button>
        <button 
          className="addToWishListBttn" 
          onClick={() => isInWishlist ? removeFromWishList(id) : addToWishList(id)} 
          style={{ color: isInWishlist ? 'red' : 'black' }}
        >
          <Heart weight="fill" />
        </button>
      </span>
    </div>
  );
};