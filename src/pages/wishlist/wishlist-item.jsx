import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { ShoppingCart, Heart } from "phosphor-react";
import { useNavigate, Link } from "react-router-dom";
import "./wishlist.css";
import { RatingStars } from "../../components/ratings-stars";


export const WishListItem = (props) => {
    const { id, productName, price, productImage, review_rating } = props.data;
    const { cartProducts, addToCart, removeFromWishList, isProductInWishList } =
        useContext(ShopContext);
    const navigate = useNavigate();
    const inCart = cartProducts[id] && cartProducts[id] > 0;
    const inWishlist = isProductInWishList(id);

    const handleAddToCart = (id) => {
        addToCart(id);
    };

    return (
        <div className="wishListItem">
            <div className="wishlistProduct">
                <Link to={`/product/${id}`}>
                    <img
                        src={productImage}
                        alt={productName}
                        className="wishlistImage"
                    />
                </Link>
                <div id="wishlistProductInfo">
                    <Link to={`/product/${id}`} id="wishListProductName">
                        {productName}
                    </Link>
                    <div id="price">${price.toFixed(2)}</div>
                    <RatingStars rating={review_rating} />
                </div>
            </div>
            <div className="wishlistActions">
                <button
                    className={`wishlistButton addToCart ${inCart ? "inCart" : ""
                        }`}
                    onClick={() => {
                        !inCart ? handleAddToCart(id) : navigate("/cart");
                    }}
                >
                    <ShoppingCart className="btn-icon" />
                    {inCart ? "Go To Cart" : "Add To Cart"}
                </button>
                <button
                    className="wishlistButton removeFromWishList"
                    onClick={() => removeFromWishList(id)}
                >
                    <Heart 
                        className="btn-icon" 
                        weight={inWishlist ? "fill" : "bold"} 
                        color={inWishlist ? "red" : "#4299E1"} 
                    />
                    Remove from Wishlist
                </button>
            </div>
        </div>
    );
};