import React, { useState, useContext } from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product-card";
import "./shop.css";
import { ShopContext } from "../../context/shop-context";

export const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const { categoryFilter } = useContext(ShopContext);

  // Filter products based on search term and category filter
  const filteredProducts = PRODUCTS.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "" || product.category === categoryFilter)
  );

  // Autofill suggestions
  const autofillSuggestions = PRODUCTS.filter((product) =>
    searchInput && product.productName.toLowerCase().startsWith(searchInput.toLowerCase())
  );

  // Handle input change
  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
    setSelectedSuggestionIndex(-1);
    setShowSuggestions(true);
  };
  const handleKeyEvent = (event) => {

    if (event.key === "Enter") {
      if (selectedSuggestionIndex >= 0) {
        setSearchTerm(autofillSuggestions[selectedSuggestionIndex].productName);
        setSearchInput(autofillSuggestions[selectedSuggestionIndex].productName);
      } else {
        setSearchTerm(event.target.value);
      }
      setShowSuggestions(false);
    } else if (event.key === "ArrowDown") {
      if (autofillSuggestions.length > 0) {
        setSelectedSuggestionIndex((prevIndex) =>
          (prevIndex + 1) % autofillSuggestions.length
        );
      }
    } else if (event.key === "ArrowUp") {
      if (autofillSuggestions.length > 0) {
        setSelectedSuggestionIndex((prevIndex) =>
          (prevIndex - 1) % autofillSuggestions.length
        );
      }
    }
  };
  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion);
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
          value={searchInput}
          onChange={handleSearchInput}
          onKeyDown={handleKeyEvent}
          onFocus={() => setShowSuggestions(true)}
          onBlur={handleBlur}
        />
        {searchTerm && (
          <button className="clearSearchBtn" onClick={() => setSearchTerm("")}>
            ✕
          </button>
        )}

        {/* Autofill Suggestions */}
        {showSuggestions && searchInput && (
          <ul className="suggestionsList">
            {autofillSuggestions.length > 0 ? (
              autofillSuggestions.map((product, index) => (
                <li
                  key={product.id}
                  onClick={() => handleSuggestionClick(product.productName)}
                  className={`suggestionItem ${selectedSuggestionIndex === index ? "highlighted" : ""
                    }`}
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
