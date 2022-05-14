import React, { useContext } from 'react';
import './ItemCard.css';
import { Button, Card } from 'react-bootstrap';
import { CartContext } from '../../Contexts';

function ItemCard({itemId, itemImgPath, itemName, itemPrice}) {

    const [cart, setCart] = useContext(CartContext);

    const addToCart = () => {
        const newCartItem = {
            id: itemId,
            name: itemName,
            imgPath: itemImgPath,
            price: itemPrice,
            amount: 5,
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
                        {itemPrice} ৳ per kg
                    </Card.Text>
                </div>
                {cart.some(item => item.id === itemId) ?
                    <Button className="addToCartButton" variant="remove"
                    onClick={removeFromCart}>
                        Remove from Cart
                    </Button>
                    :
                    <Button className="addToCartButton" variant="custom"
                    onClick={addToCart}>
                        Add to Cart
                    </Button>
                }
            </div>
        </Card>
    );
}

export default ItemCard;