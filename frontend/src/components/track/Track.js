import React, { useState, useEffect } from 'react';
import './Track.css';
import { Button, Container, Spinner, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import Axios from 'axios';
import { serverUrl } from '../../util';

function Track() {

    const orderSteps = [
        {
            status: "Received"
        },
        {
            status: "Processing"
        },
        {
            status: "Shipping"
        },
        {
            status: "Delivered"
        },
    ];
    
    const getStepPosition = (orderStatus) => {
        return orderSteps.findIndex(({ status }) => status === orderStatus);
    };

    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [transactionId, setTransactionId] = useState();
    const [textTransactionId, setTextTransactionId] = useState();
    const [orderStatus, setOrderStatus] = useState(null);
    const [orderInfo, setOrderInfo] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    function checkOrder(e){
        if(transactionId == null){
            const err = "Transaction ID is required."
            setError(err);
        }
        else if(transactionId.length !== 10){
            const err = "Invalid Transaction ID."
            setError(err);
        }
        else{
            // setLoading(false);
            // setTextTransactionId(transactionId);
            // setOrderStatus("Processing");

            setError(null);
            setLoading(true);
            const checkStatusObject = {
                transaction_id: transactionId,
            }
            Axios.post(`${serverUrl}/order/track/`, checkStatusObject)
            .then(({data: res}) => {
                const newOrderInfo = {
                    orderName: res.name,
                    orderPhone: res.phone,
                    orderAddress: res.address,
                    orderTotalCost: res.total_price,
                };
                setLoading(false);
                setTextTransactionId(transactionId);
                setOrderInfo(newOrderInfo);
                setOrderStatus(res.order_status);
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
                Track your order
            </h4>
            <div className="paymentInfoDiv">
                <div className="paymentInfoWhiteDiv">
                    <div className="trxFormDiv">
                        {error &&
                        <Alert variant='danger'>
                            {error}
                        </Alert>}
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Your Payment TrxID / Transaction ID</Form.Label>
                                <Form.Control type="text" placeholder="Enter TrxID" onChange={handleTransactionId}/>
                                {(transactionId && transactionId.length !== 10) &&
                                <Form.Text className="warnText">
                                    Enter a valid 10 digit Transaction ID.
                                </Form.Text>}
                            </Form.Group>
                        </Form>
                    </div>
                    {(orderStatus != null && orderStatus==="Invalid") &&
                    <div className="invalidTransactionIdDiv">
                        No order placed with transaction ID: <b>{textTransactionId}</b>
                    </div>
                    }
                    {(orderStatus != null && orderStatus!="Invalid") &&
                    <div>
                        <div className="orderDetailsText">
                            <b>Transaction ID:</b> {textTransactionId} <br/>
                            <b>Name:</b> {orderInfo.orderName} <br/>
                            <b>Phone:</b> {orderInfo.orderPhone} <br/>
                            <b>Address:</b> {orderInfo.orderAddress} <br/>
                            <b>Total Cost:</b> {orderInfo.orderTotalCost} BDT <br/>
                        </div>
                        <div className='progressBarDiv'>
                            Status:
                            <ProgressBar
                            width={500}
                            percent={
                                (100/(orderSteps.length-1)) * getStepPosition(orderStatus)+1
                            }
                            filledBackground="linear-gradient(to right, #41ad49, #41ad49)"
                            >
                            {orderSteps.map((step) => {
                                return (
                                <Step
                                    transition="scale"
                                    children={({ accomplished }) => (
                                        accomplished?
                                        <div className="accomplishedLineDiv">
                                            <br />
                                            <br />
                                            <br />
                                            {step.status}
                                        </div>
                                        :
                                        <div className="notAccomplishedLineDiv">
                                            <br />
                                            <br />
                                            <br />
                                            {step.status}
                                        </div>
                                    )}
                                />
                                );
                            })}
                            </ProgressBar>
                        </div>
                    </div>}
                </div>
                <div className="bottomButtonDiv">
                    <Button className="backToShippingBtn" variant="custom" as={Link} to="/">
                        Back to Home
                    </Button>
                    <Button className="confirmPurchaseBtn" variant="custom" disabled={loading} onClick={checkOrder}>
                        {loading? <Spinner animation="border" variant="dark"/> : "Check Status"}
                    </Button>
                </div>
            </div>
        </Container>
    );
}

export default Track;