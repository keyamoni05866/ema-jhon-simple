import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight} from '@fortawesome/free-solid-svg-icons'
const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart,setCart] = useState([])
    useEffect(() =>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data));
    },[]);
 useEffect(() =>{
    const storedCart = getShoppingCart();
    const savedCart =[];
    // step 1 : get id of the added product
    for(const id in storedCart){
        // step 2: get product from the id
        const addedProduct = products.find(product => product.id === id)
        // step 3: add quantity
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            // step 4: add the addedProduct to the saved cart
            savedCart.push(addedProduct)
        }
    }
    
    setCart(savedCart);
 },[products])

  const handleAddToCart = (product) =>{
   const newCart = [...cart,product];
   setCart(newCart)
   addToDb(product.id)
  };

  const handleClearCart = () =>{
    setCart([]);
    deleteShoppingCart();
  }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product key={product.id} product={product} handleAddToCart={handleAddToCart}></Product>)
                }
            
            </div>
            <div className='cart-container'>
             <Cart cart={cart} handleClearCart={handleClearCart}>
                <Link className='proceed-link' to="/orders">
                    <button className='btn-proceed' >Review Order  <FontAwesomeIcon  icon={faArrowCircleRight} /></button>
                   
                </Link>
           
             </Cart>
            </div>
        </div>
    );
};

export default Shop;