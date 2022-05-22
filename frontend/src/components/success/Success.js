import React, { useEffect, useContext } from 'react';
import './Success.css';
import orderSuccessImage from '../../assets/payment/orderSuccess.png'
import { Button, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Contexts';

function Sucess() {

    const [cart, setCart] = useContext(CartContext);
    const transactionId = window.location.href.substring(window.location.href.indexOf("success/")+8, window.location.href.length);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        const newCart = [];
        localStorage.setItem("cart", JSON.stringify(newCart));
        setCart(newCart);
    }, [])

    return (
        <Container fluid="md" className="parentContainer smallHeight">
            <h4 className="signInText">
                Order Successful!
            </h4>
            <div className="paymentInfoDiv">
                <div className="paymentInfoWhiteDiv">
                    <Image className="orderSuccessLogo" src={orderSuccessImage} />
                    <div className="instructionText">
                        Your order has been placed!
                    </div>
                    <div className="storeTrxIdText">
                        Please store your transaction ID: <b>{transactionId}</b> for future use.
                    </div>
                </div>
                <div className="bottomButtonDiv">
                    <Button className="backToShippingBtn" variant="custom" as={Link} to="/">
                        Back to Home
                    </Button>
                    <Button className="backToShippingBtn" variant="custom" as={Link} to="/track">
                        Track your Order
                    </Button>
                </div>
            </div>
        </Container>
    );
}

export default Sucess;
