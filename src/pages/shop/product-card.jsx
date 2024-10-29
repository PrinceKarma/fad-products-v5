import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import { Heart, ShoppingCart } from 'phosphor-react';

export const Product = (props) => {
  const { id, productName, price, productImage, review_rating } = props.data;
  const { addToCart, cartProducts, addToWishList, removeFromWishList, isProductInWishList } = useContext(ShopContext);

  const cartProductCount = cartProducts[id];
  const isInWishlist = isProductInWishList(id);

  const renderStars = (review_rating) => {
    const fullStars = Math.floor(review_rating);
    const hasHalfStar = review_rating % 1 >= 0.5;

    return (
      <div className="review_rating">
        {[...Array(fullStars)].map((_, index) => (
          <span key={index} style={{ color: 'gold' }}>★</span> // Full star
        ))}
        {hasHalfStar && <span style={{ color: 'gold' }}>★</span>} {/* Half star */}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
          <span key={index + fullStars + (hasHalfStar ? 1 : 0)} style={{ color: '#ccc' }}>★</span> // Empty star
        ))}
      </div>
    );
  };

  return (
    <div className="product">
      <Link to={`/product/${id}`}>
        <img src={productImage} alt={productName} />
        <div className="description">
          <p>{productName}</p>
          <p>${price.toFixed(2)}</p>
        </div>
      </Link>
      {renderStars(review_rating)}
      <div className="productActions">
        <button className="addToCartBttn" onClick={() => addToCart(id)}>
          <ShoppingCart size={20} style={{marginRight: '0.5rem'}} />
          Add To Cart {cartProductCount > 0 && <> ({cartProductCount})</>}
        </button>
        <button 
          className="addToWishListBttn" 
          onClick={() => isInWishlist ? removeFromWishList(id) : addToWishList(id)}
        >
          <Heart 
            size={20} 
            weight={isInWishlist ? "fill" : "regular"} 
            color={isInWishlist ? 'red' : '#4299E1'}
          />
        </button>
      </div>
    </div>
  );
};