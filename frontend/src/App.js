import React, { useEffect, useContext } from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Order from './components/order/Order';
import Cart from './components/cart/Cart';
import Shipping from './components/shipping/Shipping';
import Payment from './components/payment/Payment';
import { CartContext, ShippingContext } from './Contexts';
import history from './History';

function loadCartFromStorage(setCart){
    var storageCart = localStorage.getItem("cart");
    storageCart = JSON.parse(storageCart);
    if(storageCart != null && storageCart.length){
      setCart(storageCart);
    }
}
function loadShippingInfoFromStorage(setShippingInfo){
    var shippingInfo = localStorage.getItem("shippingInfo");
    shippingInfo = JSON.parse(shippingInfo);
    if(shippingInfo != null){
        setShippingInfo(shippingInfo);
    }
}

function App() {

    const [cart, setCart] = useContext(CartContext);
    const [shippingInfo, setShippingInfo] = useContext(ShippingContext);

    useEffect(() => {
        loadCartFromStorage(setCart);
        loadShippingInfoFromStorage(setShippingInfo);
    }, [])

    return (
        <div className="App">
            <BrowserRouter history={history}>
                <Header/>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/order" element={<Order/>}/>
                    <Route exact path="/cart" element={<Cart/>}/>
                    <Route exact path="/shipping" element={ (cart != null) && (cart.length) ? <Shipping/> : <Navigate to="/cart" /> } />
                    <Route exact path="/payment" element={ (cart != null) && (cart.length) ? <Payment/> : <Navigate to="/cart" /> } />
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;