import React, { useContext, useEffect, useState } from 'react';
import './Cart.css';
import EmptyCartImage from '../../assets/cart/emptyCartImage.png'
import { Container, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { CartContext, OrderSuccessContext } from '../../Contexts';

function Cart() {

    const [cart, setCart] = useContext(CartContext);
    const [orderSuccess, setOrderSuccess] = useContext(OrderSuccessContext);
    const [productCost, setCost] = useState(
        cart.reduce((acc, item) => acc + (item.amount * item.price), 0));
    const [totalAmount, setTotalAmount] = useState(
        cart.reduce((acc, item) => acc + item.amount, 0));
    const shippingCost = totalAmount*15;
    const packagingCost = totalAmount*6.;
    const [minOrderError, setMinOrderError] = useState(true);
    const [maxItemError, setMaxItemError] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        const newCost = cart.reduce((acc, item) => acc + (item.amount * item.price), 0);
        setCost(newCost);
        const newTotalAmount = cart.reduce((acc, item) => acc + item.amount, 0);
        setTotalAmount(newTotalAmount);
        if(newTotalAmount < 20){
            setMinOrderError(true);
        }
        else{
            setMinOrderError(false);
        }
        if(newTotalAmount === 20 && cart.length > 3){
            setMaxItemError(true);
        }
        else{
            setMaxItemError(false);
        }
    }, [cart])

    useEffect(() => {
        setOrderSuccess(false);
    }, [])

    return (
        <Container fluid="md" className="parentContainer smallHeight">
            <h4 className="signInText">
                My Cart
            </h4>
            {cart.length === 0 &&
                <div className="emptyDiv">
                    <Image src={EmptyCartImage}/>
                    <h4 className="emptyText">
                        It is beautiful, it is endless, it is full and yet seems empty. It hurts us.
                    </h4>
                    <div className="singleBottomButtonDiv">
                        <Button className="backToLibraryBtn" variant="custom" as={Link} to="/order">
                            Back to Order
                        </Button>
                    </div>
                </div>
            }
            {cart.length > 0 &&
                <div className="cartBodyDiv">
                    <div className="cartDivHeader">
                        <div className="itemDiv">Item Name</div>
                        <div className="unitDiv">Units</div>
                        <div className="priceDiv">Price (BDT)</div>
                    </div>
                    <div className="cartDiv">
                        {cart.map(item => (
                            <CartItem itemId={item.id} itemName={item.name} itemImgPath={item.imgPath}
                            itemAmount={item.amount} itemPrice={item.price} />
                        ))}
                    </div>
                    <div className="cartDivFooter">
                        <div className="labelDiv">
                            Total Item Cost <br/>
                            Shipping Cost <br/>
                            Packaging Cost
                        </div>
                        <div className="numberDiv">
                            {productCost} BDT <br/>
                            {shippingCost} BDT <br/>
                            {packagingCost} BDT
                        </div>
                    </div>
                    <div className="totalBillDiv">
                        Total Cost: {productCost+shippingCost+packagingCost} BDT <br/>
                    </div>
                    {minOrderError &&
                        <div className="incorrectOrderDiv">
                            Minimum order is 20kg.
                        </div>
                    }
                    {maxItemError &&
                        <div className="incorrectOrderDiv">
                            Maximum 3 types of items allowed with a 20kg order.
                        </div>
                    }
                    <div className="bottomButtonDiv">
                        <Button className="backToLibraryBtn" variant="custom" as={Link} to="/order">
                            Back to Order
                        </Button>
                        <Button className="continueToShippingBtn" variant="custom" disabled={minOrderError || maxItemError}
                            as={Link} to="/shipping">
                                Checkout
                        </Button>
                    </div>
                </div>
            }
        </Container>
    );
}

export default Cart;