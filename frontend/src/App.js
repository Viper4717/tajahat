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
import Success from './components/success/Success';
import Track from './components/track/Track';
import { CartContext, ShippingContext, OrderSuccessContext } from './Contexts';
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
    const [orderSuccess, setOrderSuccess] = useContext(OrderSuccessContext);

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
                    <Route exact path="/track" element={<Track/>}/>
                    <Route exact path="/cart" element={<Cart/>}/>
                    <Route exact path="/shipping" element={ (cart != null) && (cart.length) ? <Shipping/> : <Navigate to="/cart" /> } />
                    <Route exact path="/payment" element={ (cart != null) && (cart.length) ? <Payment/> : <Navigate to="/cart" /> } />
                    <Route exact path="/success" element={ orderSuccess ? <Success/> : <Navigate to="/cart" /> } />
                    <Route path="*" element={<Navigate to="/"/>} />
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;