import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from 'phosphor-react';
import { Heart } from 'phosphor-react';
import { MagnifyingGlass } from 'phosphor-react';

import "./navbar.css";

export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="links">
                {/* <Link to="/"> Shop </Link>
                <Link to="/wishlist"><Heart size={32} /> </Link>
                <Link to="/cart"> <ShoppingCart size={32} /> </Link> */}
                <Link to="/"> <div className="navbar-element">Shop </div></Link>
                <Link to="/wishlist"><div className="navbar-element"><Heart size={30} /> <div className="navbar-element-subtext">WishList</div></div></Link>
                <Link to="/cart"> <div className="navbar-element"><ShoppingCart size={30} /> <div className="navbar-element-subtext">Cart</div></div></Link>

            </div>
        </div>
    );
}
