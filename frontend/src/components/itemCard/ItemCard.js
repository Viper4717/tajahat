import React, { useState, useEffect, useContext } from 'react';
import './ItemCard.css';
import { Button, Card } from 'react-bootstrap';
import { CartContext } from '../../Contexts';

function ItemCard({itemId, itemImgPath, itemName, itemPrice, itemAvailability, itemAmount}) {

    const [cart, setCart] = useContext(CartContext);
    const [amount, setAmount] = useState();

    useEffect(() => {
        setAmount(itemAmount);
    }, [itemAmount])

    const addToCart = () => {
        const newCartItem = {
            id: itemId,
            name: itemName,
            imgPath: itemImgPath,
            price: itemPrice,
            amount: amount,
        };
        const newCart = [...cart, newCartItem];
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    const removeFromCart = () => {
        const newCart = cart.filter(item => item.id !== itemId);
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    const increaseQty = () =>{
        if(amount < 99){
            const newAmount = amount + 5;
            modifyAmount(newAmount);
        }
    }
    const decreaseQty = () =>{
        if(amount > 5){
            const newAmount = amount - 5;
            modifyAmount(newAmount);
        }
    }
    const modifyAmount = (newAmount) => {
        const index = cart.findIndex(item => item.id === itemId);
        if(index !== -1){
            const newCart = [...cart];
            newCart[index] = {...newCart[index], amount: newAmount};
            setCart(newCart);
            localStorage.setItem("cart", JSON.stringify(newCart));
        }
        setAmount(newAmount);
    }

    return (
        <Card className="itemCard">
            <div className="itemCardDiv">
                <div className="itemImageBg">
                    <Card.Img className="itemImage" src={itemImgPath} alt="Mango Image"/>
                </div>
                <div className="itemDetailsBg">
                    <Card.Title className="itemTitle">
                        {itemName}
                    </Card.Title>
                    <Card.Text className="itemPrice">
                        {itemPrice} BDT per kg
                    </Card.Text>
                    {itemAvailability === false &&
                    <Card.Text className="itemAvailability">
                        Not Available
                    </Card.Text>
                    }
                </div>
                <div className="itemCardQtyBg">
                    <Button className="qtyBtn" variant="light" onClick={decreaseQty} disabled={itemAvailability===false}>-</Button>
                    <div className="cartItemQtyDiv"> {amount} kg </div>
                    <Button className="qtyBtn" variant="light" onClick={increaseQty} disabled={itemAvailability===false}>+</Button>
                </div>
                {cart.some(item => item.id === itemId) ?
                    <Button className="addToCartButton" variant="remove"
                    onClick={removeFromCart} disabled={itemAvailability===false}>
                        Remove from Cart
                    </Button>
                    :
                    <Button className="addToCartButton" variant="custom"
                    onClick={addToCart} disabled={itemAvailability===false}>
                        Add to Cart
                    </Button>
                }
            </div>
        </Card>
    );
}

export default ItemCard;