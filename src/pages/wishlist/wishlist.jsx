import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { useNavigate } from "react-router-dom";
import { WishListItem } from "./wishlist-item";


export const WishList = () => {
    const { wishList, getTotalCartAmount, checkout } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

    const navigate = useNavigate();

    return (
        <div className="wishlist-container">
            <div>
                <h1>Wishlist</h1>
            </div>
            {wishList.length != 0 ? (
                <div className="wishlist">
                    {wishList.map((productId) => {
                        let product = PRODUCTS.find(product => product.id === productId)
                        return <WishListItem data={product} />;
                    })}
                </div>) : (
                <h1>Your WishList is Empty</h1>
            )}

            {/* {totalAmount > 0 ? (
                <div className="checkout">
                    <p> Subtotal: ${totalAmount} </p>
                    <button onClick={() => navigate("/")}> Continue Shopping </button>
                    <button
                        onClick={() => {
                            checkout();
                            navigate("/checkout");
                        }}
                    >
                        {" "}
                        Checkout{" "}
                    </button>
                </div>
            ) : (
                <h1> Your Shopping Cart is Empty</h1>
            )} */}
        </div>
    );
};