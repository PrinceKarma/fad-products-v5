import React, { useState, useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { TrashSimple, CheckSquare } from "phosphor-react"

import { useNavigate } from "react-router-dom";
import "./wishlist.css";
export const WishListItem = (props) => {
    const { id, productName, price, productImage } = props.data;
    const { cartProducts, addToCart, removeFromCart, updateCartProductCount, removeFromWishList } =
        useContext(ShopContext);
    const navigate = useNavigate();
    const inCart = cartProducts[id] && cartProducts[id] > 0;
    const handleAddToCart = (id) => {
        addToCart(id);
    }

    return (
        <div className="wishListItem">



            <div className="wishlistProduct">
                <img src={productImage} />
                {/* <div className="description"> */}
                <p>
                    <b>{productName}</b>
                </p>
                <p> ${price}</p>

                {/* </div> */}



            </div >
            <div className="wishlistActions">

                <div className="alert-container" style={{
                    visibility: inCart ? "visible" : "hidden"
                }}>
                    <CheckSquare className="alert-icon" color="#1fd348" weight="duotone" />
                    Added to Cart
                </div>
                <button className="addToCart" onClick={() => { !inCart ? handleAddToCart(id) : navigate("/cart"); }}>
                    {inCart ? 'Go To Cart' : 'Add To Cart'}
                </button>
                <button className="removeFromWishList" onClick={() => removeFromWishList(id)} >
                    <TrashSimple />
                </button>
            </div>
        </div >
    );
};