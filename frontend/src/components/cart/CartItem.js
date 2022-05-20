import React, { useState, useContext, useEffect } from 'react';
import './CartItem.css';
import { Card, Button } from 'react-bootstrap';
import { CgTrash } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Contexts';

function CartItem({itemId, itemName, itemImgPath, itemAmount, itemPrice}) {

    const [cart, setCart] = useContext(CartContext);
    const [amount, setAmount] = useState();

    useEffect(() => {
        setAmount(itemAmount);
    }, [itemAmount])

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
        const newCart = [...cart];
        newCart[index] = {...newCart[index], amount: newAmount};
        setCart(newCart);
        setAmount(newAmount);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    return (
        <Card className="cartItem">
            <div className="cartItemDiv">
                <div className="cartItemCoverBg">
                    <Card.Img className="cartItemCover" src={itemImgPath} alt="Item Image"/>
                </div>
                <div className="cartBodyBg">
                    <div className="cartItemDetailsBg">
                        <Card.Title className="cartItemTitle">
                            {itemName}
                        </Card.Title>
                    </div>
                    <div className="cartItemDeleteBg">
                        <Button className="itemDeleteButton" variant="custom" onClick={removeFromCart}>
                            <CgTrash className="trashIcon" size='1.5em' />
                        </Button>
                        {/* <Link onClick={removeFromCart}>
                            <CgTrash className="trashIcon" size='1.5em' as={Link} onClick={removeFromCart} />
                        </Link> */}
                    </div>
                </div>
                <div className="cartItemQtyBg">
                    <Button className="qtyBtn" variant="light" onClick={decreaseQty}>-</Button>
                    <div className="cartItemQtyDiv"> {amount} kg </div>
                    <Button className="qtyBtn" variant="light" onClick={increaseQty}>+</Button>
                </div>
                <div className="cartItemPriceBg">
                    <Card.Text className="cartItemPrice">
                        {itemAmount * itemPrice}
                    </Card.Text>
                </div>
            </div>
        </Card>
    );
}

export default CartItem;
