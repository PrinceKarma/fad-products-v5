import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { WishListItem } from "./wishlist-item";


export const WishList = () => {
    const { wishList } = useContext(ShopContext);

    return (
        <div className="wishlist-container">
            <div>
                <h1>Wishlist</h1>
            </div>
            {wishList.length !== 0 ? (
                <div className="wishlist">
                    {wishList.map((productId) => {
                        let product = PRODUCTS.find(product => product.id === productId)
                        return <WishListItem data={product} />;
                    })}
                </div>) : (
                <h2>Your WishList is Empty</h2>
            )}
        </div>
    );
};
