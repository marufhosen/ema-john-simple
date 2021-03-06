import React from "react";
import fakeData from "../../fakeData";

const Inventory = () => {
  const handleAddProduct = () => {
    const product = {};
    fetch("http://localhost:5000/addProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
  };
  return (
    <div>
      <p>
        <span>Product Name: </span>
        <input type="text" />
      </p>
      <p>
        <span>Price: </span>
        <input type="text" />
      </p>
      <p>
        <span>Quantity: </span>
        <input type="text" />
      </p>
      <p>
        <span>Product Image</span>
        <input type="file" />
      </p>
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default Inventory;
