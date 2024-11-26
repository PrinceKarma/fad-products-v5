import React, { useState, useContext } from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product-card";
import "./shop.css";
import { ShopContext } from "../../context/shop-context";

export const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { categoryFilter } = useContext(ShopContext);

  // Filter products based on search term and category filter
  const filteredProducts = PRODUCTS.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "" || product.category === categoryFilter)
  );

  // Autofill suggestions
  const autofillSuggestions = PRODUCTS.filter((product) =>
    product.productName.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  // Handle input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setShowSuggestions(true);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  // Hide suggestions when clicking outside
  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100); // Delay to allow clicking a suggestion
  };

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
          onFocus={() => setShowSuggestions(true)}
          onBlur={handleBlur}
        />
        {searchTerm && (
          <button className="clearSearchBtn" onClick={() => setSearchTerm("")}>
            ✕
          </button>
        )}

        {/* Autofill Suggestions */}
        {showSuggestions && searchTerm && (
          <ul className="suggestionsList">
            {autofillSuggestions.length > 0 ? (
              autofillSuggestions.map((product) => (
                <li
                  key={product.id}
                  onClick={() => handleSuggestionClick(product.productName)}
                  className="suggestionItem"
                >
                  {product.productName}
                </li>
              ))
            ) : (
              <li className="noSuggestion">No suggestions available</li>
            )}
          </ul>
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
