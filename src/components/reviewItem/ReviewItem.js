import React from "react";

const ReviewItem = (props) => {
  const { name, quantity, key, price } = props.product;
  const reviewStyle = {
    borderBottom: "1px solid purple",
    marginBottom: "5px",
    paddingBottom: "5px",
    marginLeft: "200px",
  };
  return (
    <div style={reviewStyle}>
      <h4>{name}</h4>
      <p>Quantity: {quantity}</p>
      <br />
      <p>Price: {price}</p>
      <button onClick={()=>props.removeProduct(key)} className="cart-button">Remove</button>
    </div>
  );
};

export default ReviewItem;
