import React from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";
import { useEffect } from "react";
import { useState } from "react";

const ProductDetail = () => {
  const { productKey } = useParams();
  const [product, setProduct] = useState([]);
  //   const product = fakeData.find((pd) => pd.key === productKey);
  useEffect(() => {
    fetch("http://localhost:5000/product/" + productKey)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [productKey]);
  return (
    <div>
      <h1>Product Details</h1>
      <Product showAddtoCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDetail;
