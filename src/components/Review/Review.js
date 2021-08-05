import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../reviewItem/ReviewItem";
import happyImage from "../../images/giphy.gif";
import { useHistory } from "react-router-dom";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderdPlaced, setOrderdPlaced] = useState(false);

  const history = useHistory();

  const handleProceedCheckout = () => {
    history.push("/shipment");
  };

  const removeProduct = (productKey) => {
    // console.log(productKey);
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    const cartProducts = productKeys.map((pk) => {
      const product = fakeData.find((pd) => pd.key === pk);
      product.quantity = savedCart[pk];
      return product;
    });
    setCart(cartProducts);
  }, []);

  let thankYou;
  if (orderdPlaced) {
    thankYou = <img src={happyImage} alt="" />;
  }
  return (
    <div className="shop-container">
      <div className="products-container">
        {cart.map((pd) => (
          <ReviewItem
            removeProduct={removeProduct}
            key={pd.key}
            product={pd}
          ></ReviewItem>
        ))}
        {thankYou}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleProceedCheckout} className="cart-button">
            Proceed Checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
