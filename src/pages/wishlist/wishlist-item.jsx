import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { TrashSimple } from "phosphor-react";
import { useNavigate, Link } from "react-router-dom";
import "./wishlist.css";
import { RatingStars } from "../../components/ratings-stars";

export const WishListItem = (props) => {
    const { id, productName, price, productImage, review_rating } = props.data;
    const { cartProducts, addToCart, removeFromWishList } =
        useContext(ShopContext);
    const navigate = useNavigate();
    const inCart = cartProducts[id] && cartProducts[id] > 0;

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
                    <div id="price">${price}</div>
                    <RatingStars rating={review_rating} />
                </div>
            </div>
            <div className="wishlistActions">
                <button
                    className={`wishlistButton addToCart ${
                        inCart ? "inCart" : ""
                    }`}
                    onClick={() => {
                        !inCart ? handleAddToCart(id) : navigate("/cart");
                    }}
                >
                    {inCart ? "Go To Cart" : "Add To Cart"}
                </button>
                <button
                    className="wishlistButton removeFromWishList"
                    onClick={() => removeFromWishList(id)}
                >
                    <TrashSimple />
                    Remove
                </button>
            </div>
        </div>
    );
};
