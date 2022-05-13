import React, { useState, useEffect, useContext } from 'react';
import './Payment.css';
import bkashLogo from '../../assets/payment/bkashLogo.png'
import { Button, Container, Image, Spinner, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext,ShippingContext } from '../../Contexts';
// import Axios from 'axios';
import { serverUrl } from '../../util';
import history from '../../History';

function Payment() {

    const [loading, setLoading] = useState(false);
    const [transactionId, setTransactionId] = useState();
    const [cart, setCart] = useContext(CartContext);
    const [shippingInfo, setShippingInfo] = useContext(ShippingContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    // function placeOrder(e){
    //     setLoading(true);
    //     const orderObject = {
    //         products: cart,
    //         phone: shippingInfo.phone,
    //         shippingAddress: shippingInfo.address,
    //         token: user.accessToken,
    //     }
    //     Axios.post(`${serverUrl}/order`, orderObject)
    //     .then(({data: res}) => {
    //         setLoading(false);
    //         const newCart = [];
    //         localStorage.setItem("cart", JSON.stringify(newCart));
    //         setCart(newCart);
    //         window.location.assign('/ordersuccess');
    //     })
    //     .catch((error) => {
    //         setLoading(false);
    //         if(error.response != null && error.response.status == 401){
    //             requestAccess(user, setUser);
    //         }
    //         else{
    //             window.scrollTo(0, 0);
    //             const msg = "Failed to send order"
    //         }
    //     });
    // }
    function handleTransactionId(e){
        setTransactionId(e.target.value);
    }
    return (
        <Container fluid="md" className="parentContainer smallHeight">
            <h4 className="signInText">
                Finalizing your order
            </h4>
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
                    <div className="instructionText">
                        Send money through Bkash to the following number: +8801521101256
                    </div>
                    <div className="formDiv">
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
                    <Button className="confirmPurchaseBtn" variant="custom" disabled={loading}>
                    {/* onClick={placeOrder}> */}
                        {loading? <Spinner animation="border" variant="dark"/> : "Confirm Purchase"}
                    </Button>
                </div>
            </div>
        </Container>
    );
}

export default Payment;
