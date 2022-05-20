import React, { useState, useEffect } from 'react';
import './Track.css';
import { Button, Container, Spinner, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { serverUrl } from '../../util';

function Track() {

    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [transactionId, setTransactionId] = useState();
    const [textTransactionId, setTextTransactionId] = useState();
    const [orderStatus, setOrderStatus] = useState(null);

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
            // setOrderStatus("Invalid");

            setError(null);
            setLoading(true);
            const checkStatusObject = {
                transaction_id: transactionId,
            }
            Axios.post(`${serverUrl}/track/`, checkStatusObject)
            .then(({data: res}) => {
                setLoading(false);
                setTextTransactionId(transactionId);
                setOrderStatus(res.status);
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
                    <div className="formDiv">
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
                    {orderStatus != null &&
                    <div>
                        <div className="transactionIdDiv">
                            Transaction ID: <b>{textTransactionId}</b> <br/>
                            Status:
                        </div>
                        <div className={orderStatus}>
                            <b>{orderStatus}</b>
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