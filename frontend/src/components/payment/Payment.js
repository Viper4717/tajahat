import React, { useState, useEffect, useContext } from 'react';
import './Payment.css';
import bkashLogo from '../../assets/payment/bkashLogo.png'
import orderSuccessImage from '../../assets/payment/orderSuccess.png'
import { Button, Container, Image, Spinner, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext,ShippingContext } from '../../Contexts';
import Axios from 'axios';
import { serverUrl } from '../../util';

function Payment() {

    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [transactionId, setTransactionId] = useState();
    const [cart, setCart] = useContext(CartContext);
    const [productCost, setCost] = useState(
        cart.reduce((acc, item) => acc + (item.amount * item.price), 0));
    const [shippingInfo, setShippingInfo] = useContext(ShippingContext);
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    function placeOrder(e){
        if(transactionId == null){
            const err = "Transaction ID is required."
            setError(err);
        }
        else{
            setError(null);
            setLoading(true);
            const newCart = [...cart];
            newCart = newCart.map(item => {item.price = item.price * item.amount})
            const orderObject = {
                name: shippingInfo.name,
                phone: shippingInfo.phone,
                address: shippingInfo.address,
                order_list: newCart,
                total_price: productCost,
                transaction_id: transactionId,
            }
            Axios.post(`${serverUrl}/order/`, orderObject)
            .then(({data: res}) => {
                setLoading(false);
                const newCart = [];
                localStorage.setItem("cart", JSON.stringify(newCart));
                setCart(newCart);
                setOrderSuccess(true)
            })
            .catch((error) => {
                setLoading(false);
                window.scrollTo(0, 0);
                const msg = "Failed to send order"
            });
        }
    }
    function handleTransactionId(e){
        setTransactionId(e.target.value);
    }
    return (
        <Container fluid="md" className="parentContainer smallHeight">
            <h4 className="signInText">
                Finalizing your order
            </h4>
            {!orderSuccess &&
            <div className="paymentInfoDiv">
                <div className="paymentInfoWhiteDiv">
                    <h5 className="paymentInfoText">
                        Payment Info
                    </h5>
                    <div className="paymentImageDiv">
                        <Image className="bkashLogo" src={bkashLogo} />
                    </div>
                    <h5 className="bkashText">
                        Bkash
                    </h5>
                    <div className="shippingDetailsText">
                        Name: {shippingInfo.name} <br/>
                        Phone: {shippingInfo.phone} <br/>
                        Address: {shippingInfo.address} <br/>
                    </div>
                    <div className="instructionText">
                        Your Total Bill: <b> {productCost} ৳ </b> <br/>
                        Send money through Bkash to the following number: <b> +8801521101256 </b>
                    </div>
                    <div className="formDiv">
                        {error &&
                        <Alert variant='danger'>
                            {error}
                        </Alert>}
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Your Payment TrxID / Transaction ID</Form.Label>
                                <Form.Control type="text" placeholder="Enter TrxID" onChange={handleTransactionId}/>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
                <div className="bottomButtonDiv">
                    <Button className="backToShippingBtn" variant="custom" as={Link} to="/shipping">
                        Back to Shipping
                    </Button>
                    <Button className="confirmPurchaseBtn" variant="custom" disabled={loading} onClick={placeOrder}>
                        {loading? <Spinner animation="border" variant="dark"/> : "Confirm Purchase"}
                    </Button>
                </div>
            </div>}
            {orderSuccess &&
            <div className="paymentInfoDiv">
                <div className="paymentInfoWhiteDiv">
                    <Image className="orderSuccessLogo" src={orderSuccessImage} />
                    <div className="instructionText">
                        Your order has been placed!
                    </div>
                </div>
                <div className="bottomButtonDiv">
                    <Button className="backToShippingBtn" variant="custom" as={Link} to="/">
                        Back to Home
                    </Button>
                </div>
            </div>
            }
        </Container>
    );
}

export default Payment;
