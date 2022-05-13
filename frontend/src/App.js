import React, { useEffect, useContext } from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Order from './components/order/Order';
import Cart from './components/cart/Cart';
import Shipping from './components/shipping/Shipping';
import { CartContext } from './Contexts';
import history from './History';

function loadCartFromStorage(setCart){
    var storageCart = localStorage.getItem("cart");
    storageCart = JSON.parse(storageCart);
    if(storageCart != null && storageCart.length){
      setCart(storageCart);
    }
}

function App() {

    const [cart, setCart] = useContext(CartContext);

    useEffect(() => {
        loadCartFromStorage(setCart);
    }, [])

    return (
        <div className="App">
            <BrowserRouter history={history}>
                <Header/>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/order" element={<Order/>}/>
                    <Route exact path="/cart" element={<Cart/>}/>
                    <Route exact path="/shipping" element={<Shipping/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;