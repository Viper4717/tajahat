import React, { useState } from 'react';

export const CartContext = React.createContext();

export const CartProvider = (props) => {
    const [cart, setCart] = useState([])

    return(
        <CartContext.Provider value = {[cart, setCart]}>
            {props.children}
        </CartContext.Provider>
    )
}

export const ShippingContext = React.createContext();

export const ShippingProvider = (props) => {
    const [shippingInfo, setShippingInfo] = useState()

    return(
        <ShippingContext.Provider value = {[shippingInfo, setShippingInfo]}>
            {props.children}
        </ShippingContext.Provider>
    )
}