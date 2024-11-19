import React, { useState, useContext } from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product-card";
import "./shop.css";
import { ShopContext } from "../../context/shop-context";

export const Shop = () => {
  // State to handle search term
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const { categoryFilter } =
    useContext(ShopContext);

  const filteredProducts = PRODUCTS.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()) && (categoryFilter === "" || product.category === categoryFilter)
  );



  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Shop</h1>
      </div>


      {/* Search Bar */}
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm && (
          <button
            className="clearSearchBtn"
            onClick={() => setSearchTerm('')}
          >
            ✕
          </button>
        )}
      </div>
      <div
        style={{ visibility: categoryFilter ? "visible" : "hidden" }}
        className="currentCategory"
      >
        Viewing Products from the {categoryFilter} section
      </div>

      {/* Products List */}
      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product key={product.id} data={product} />
          ))
        ) : (
          <div className="noResults">
            <p>No products found. Please try a different search term or clear the search to exit.</p>
          </div>
        )}
      </div>
    </div>
  );
};