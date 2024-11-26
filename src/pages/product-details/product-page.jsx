import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../../context/shop-context';
import { PRODUCTS } from '../../products';
import { ShoppingCart, Heart } from 'phosphor-react';
import './product-page.css';
import { RatingStars } from '../../components/ratings-stars';

export const ProductPage = () => {
  const { id } = useParams();
  const { addToCart, removeFromCart, cartProducts, addToWishList, removeFromWishList, isProductInWishList } = useContext(ShopContext);

  const product = PRODUCTS.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const cartProductCount = cartProducts[product.id] || 0;
  const isInWishlist = isProductInWishList(product.id);

  return (
    <div className="product-page">
      <div className="product-content">
        <div className="product-image-container">
          <img className="product-image" src={product.productImage} alt={product.productName} />
        </div>
        <div className="product-details">
          <p className="product-category">{product.category}</p>
          <h1 className="product-title">{product.productName}</h1>
          <div className="product-rating">
            <RatingStars className="rating-star" rating={product.review_rating} />
            <span className="rating-text">{product.review_rating} out of 5 ({Math.floor(product.review_rating * 100)} reviews)</span>
          </div>
          <p className="product-description">{product.description}</p>
          <p className="product-featured">Featured on: {product.featured_on.join(", ")}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <div className="product-actions">
            <button
              className="btn btn-primary"
              onClick={() => addToCart(product.id)}
            >
              <ShoppingCart className="btn-icon" />
              Add to Cart
            </button>
            {cartProductCount > 0 && (
              <div className="cart-counter">
                <span
                  className="counter-action"
                  onClick={() => removeFromCart(product.id)}
                >
                  -
                </span>
                <span className="counter-count">{cartProductCount}</span>
                <span
                  className="counter-action"
                  onClick={() => addToCart(product.id)}
                >
                  +
                </span>
              </div>
            )}
            <button
              className="btn btn-secondary"
              onClick={() =>
                isInWishlist
                  ? removeFromWishList(product.id)
                  : addToWishList(product.id)
              }
            >
              <Heart
                className="btn-icon"
                weight={isInWishlist ? "fill" : null} // Change weight only
                color={isInWishlist ? "red" : "#4299E1"} // Optional color change
              />
              {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
