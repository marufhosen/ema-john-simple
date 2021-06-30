import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const firstTenItem = fakeData.slice(0,10);
    // console.log(firstTenItem);
    const [product, setProduct] = useState(firstTenItem);
    const [cart, setCart] = useState([]);

    const handleAddProduct = (eachProduct) =>{
        console.log(eachProduct);
        const newcart = [...cart, eachProduct];
        setCart(newcart);
    }

    return (
        <div className="shop-container">
            <div className="products-container">
                {
                    product.map(pd => <Product handleProductAdd ={handleAddProduct} product={pd} key=""></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;