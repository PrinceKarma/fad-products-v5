import React, { useState } from "react";
import { PRODUCTS } from "../../products"; // Assuming your products are imported from here
import { Product } from "./product-card"; // Assuming Product is the component for each product
import "./shop.css";

export const Shop = () => {
  // State to handle search term
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter products based on the search term
  const filteredProducts = PRODUCTS.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Fad Products</h1>
      </div>

      {/* Search Bar */}
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ padding: "10px", width: "100%", marginBottom: "20px" }}
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
            <p>No products found. Please try searching again.</p>
          </div>
        )}
      </div>
    </div>
  );
};
