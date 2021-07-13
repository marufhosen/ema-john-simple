import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import "./Shop.css";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
import { Link } from "react-router-dom";

const Shop = () => {
  const firstTenItem = fakeData.slice(0, 10);
  // console.log(firstTenItem);
  const [product, setProduct] = useState(firstTenItem);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const previousCart = productKeys.map((existingKey) => {
      const product = fakeData.find((pd) => pd.key === existingKey);
      product.quantity = savedCart[existingKey];
      return product;
    });
    console.log(previousCart);
    setCart(previousCart);
  }, []);

  const handleAddProduct = (eachProduct) => {
    const toBeAdded = eachProduct.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAdded);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAdded);
      newCart = [...others, sameProduct];
    } else {
      eachProduct.quantity = 1;
      newCart = [...cart, eachProduct];
    }

    setCart(newCart);

    addToDatabaseCart(eachProduct.key, count);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {product.map((pd) => (
          <Product
            showAddtoCart={true}
            handleProductAdd={handleAddProduct}
            product={pd}
            key={pd.key}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="cart-button">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
