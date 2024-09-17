import React from "react";
import { PRODUCTS } from "./products";

function ProductList() {
    return (
      <div>
        <h1>Products</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
                width: "200px",
              }}
            >
              {/* Display product image */}
              <img
                src={product.productImage}
                alt={product.productName}
                style={{ width: "100%", height: "150px", objectFit: "contain" }}
              />
              {/* Display product name */}
              <h2>{product.productName}</h2>
              {/* Display product price */}
              <p>${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default ProductList;