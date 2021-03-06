import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import './Shipping.css'
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ShippingContext } from '../../Contexts';

function Shipping() {

    const [shippingInfo, setShippingInfo] = useContext(ShippingContext);

    const [error, setError] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        if(shippingInfo != null){
            setName(shippingInfo.name);
            setPhone(shippingInfo.phone);
            setAddress(shippingInfo.address);
        }
        else{
            setName("");
            setPhone("");
            setAddress("");
        }
    }, [shippingInfo])

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
        if(name && phone && address){
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
                navigate("/payment");
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
                <Form onSubmit={handleSubmit} >
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" defaultValue={name} onChange={handleName}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="tel" placeholder="Enter number"  defaultValue={phone} onChange={handlePhone}/>
                        {(phone && !validatePhone(phone)) &&
                        <Form.Text className="warnText">
                            Enter a valid number.
                        </Form.Text>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter address"  defaultValue={address} onChange={handleAddress} />
                        {(address && address.length < 10) &&
                        <Form.Text className="warnText">
                            Address must be minimum 10 characters long.
                        </Form.Text>}
                    </Form.Group>
                    <div className="bottomButtonDiv">
                        <Button className="backToCartBtn" variant="custom" as={Link} to="/cart">
                            Back to Cart
                        </Button>
                        <Button className="continueToConfirmBtn" variant="custom" type="submit" >
                            Continue to Payment
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
}

export default Shipping;
