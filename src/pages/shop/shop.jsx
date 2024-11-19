import React, { useState } from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product-card";
import "./shop.css";

export const Shop = () => {
  // State to handle search term
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = PRODUCTS.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
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
      </div>

      {/* Products List */}
      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product key={product.id} data={product} />
          ))
        ) : (
          <div className="noResults">
            <p>No products found. Please try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};