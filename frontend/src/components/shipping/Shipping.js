import React, { useState, useEffect, useContext } from 'react';
import './Shipping.css'
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShippingContext } from '../../Contexts';
import history from '../../History';

function loadShippingInfoFromStorage(setShippingInfo){
    var storageShippingInfo = localStorage.getItem("shippingInfo");
    storageShippingInfo = JSON.parse(storageShippingInfo);
    if(storageShippingInfo != null && storageShippingInfo.length){
        setShippingInfo(storageShippingInfo);
    }
}

function Shipping() {

    const [shippingInfo, setShippingInfo] = useContext(ShippingContext);

    const [error, setError] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();

    useEffect(() => {
        window.scrollTo(0, 0);
        loadShippingInfoFromStorage(setShippingInfo);
    },)

    useEffect(() => {
        setName(shippingInfo.name);
        setPhone(shippingInfo.phone);
        setAddress(shippingInfo.address);
    },)

    function validatePhone(phone){
        const re = /^(\+88)?(01[3-9]{1}\d{8}$)/
        return re.test(phone);
    }
    function handleName(e){
        setName(e.target.value);
    }
    function handlePhone(e){
        setPhone(e.target.value);
    }
    function handleAddress(e){
        setAddress(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(phone && address){
            setError(null);
            if(!validatePhone(phone) || address.length < 10){
                window.scrollTo(0, 0);
                const err = "Invalid data."
                setError(err);
            }
            else{
                const newShippingInfo = {
                    name: name,
                    phone: phone,
                    address: address,
                };
                setShippingInfo(newShippingInfo);
                localStorage.setItem("shippingInfo", JSON.stringify(newShippingInfo));
                setError(null);
                history.push("/confirmation");
            }
        }
        else{
            window.scrollTo(0, 0);
            const err = "Please fill out all the details."
            setError(err);
        }
    }
    
    return (
        <Container fluid="md" className="parentContainer smallHeight">
            <h4 className="signInText">
                Shipping Info
            </h4>
            <div className="formDiv">
                {error &&
                <Alert variant='danger'>
                    {error}
                </Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" defaultValue={shippingInfo.name} onChange={handleName}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="tel" placeholder="Enter number" defaultValue={shippingInfo.phone} onChange={handlePhone}/>
                        {(phone && !validatePhone(phone)) &&
                        <Form.Text className="warnText">
                            Enter a valid number.
                        </Form.Text>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter address" defaultValue={shippingInfo.address} onChange={handleAddress} />
                        {(address && address.length < 10) &&
                        <Form.Text className="warnText">
                            Address must be minimum 10 characters long.
                        </Form.Text>}
                    </Form.Group>
                    <div className="bottomButtonDiv">
                        <Button className="backToCartBtn" variant="custom" as={Link} to="/cart">
                            Back to Cart
                        </Button>
                        <Button className="continueToConfirmBtn" variant="custom" type="submit">
                            Continue
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
}

export default Shipping;
