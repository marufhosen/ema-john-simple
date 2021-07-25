import React from "react";
import "./Cart.css";

const Cart = (props) => {
  const cart = props.cart;

  // const total = cart.reduce((total, prd)=> total + prd.price,0);
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total = total + product.price * product.quantity;
  }

  let shippingCost = 0;
  if (total > 35) {
    shippingCost = 0;
  } else if (total > 15) {
    shippingCost = 4.99;
  } else if (total > 0) {
    shippingCost = 12.99;
  }

  const tax = total / 10;
  const grandTotal = total + shippingCost + Number(tax);

  const formatAmount = (num) => {
    const precision = num.toFixed(2);
    return Number(precision);
  };

  return (
    <div>
      <h2>Order Summary</h2>
      <p>Item Oederd: {cart.length}</p>
      <p>Product Price: {formatAmount(total)}</p>
      <p>Shipping Cost: {shippingCost}</p>
      <p>
        <small>Tax: {formatAmount(tax)}</small>
      </p>
      <p>Total Price: {formatAmount(grandTotal)}</p>
      <br />
      {props.children}
    </div>
  );
};

export default Cart;
