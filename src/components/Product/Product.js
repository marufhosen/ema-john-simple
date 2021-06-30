import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';

const Product = (props) => {
    const { img, name, seller, price, stock } = props.product;
    // console.log(props);
    return (
        <div className="product">
            <div className="product-image">
                <img src={img} alt="" />
            </div>
            <div className="product-details">
                <p className="product-name">{name}</p>
                <p><small>By: {seller}</small></p>
                <p>Price: ${price}</p>
                <p>Only {stock} left in stock - Order soon</p>
                <button onClick={()=>props.handleProductAdd(props.product)} className="cart-button"><FontAwesomeIcon className="cart-icon" icon={faShoppingCart} />Add to Cart</button> 
            </div>
        </div>
    );
};

export default Product;

// When we pass a perameter from onclick event, we have must used arrow function[Like 19 no. line]