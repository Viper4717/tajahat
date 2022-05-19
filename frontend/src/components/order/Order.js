import React, { useState, useEffect, useContext } from 'react';
import './Order.css';
import { Container, Spinner } from 'react-bootstrap';
import ItemCard from '../itemCard/ItemCard';
import cardMangoImage from '../../assets/order/cardMangoImage.jpg';
import Axios from 'axios';
import { serverUrl, useLocalStorage } from '../../util';

const items = [
    {
        "itemId": 1,
        "itemName": "Fajli",
        "itemPrice": "200",
        "itemImgPath": cardMangoImage,
        "itemAvailability": true,
        "itemAmount" : 5,
    },
    {
        "itemId": 2,
        "itemName": "Lengra",
        "itemPrice": "400",
        "itemImgPath": cardMangoImage,
        "itemAvailability": true,
        "itemAmount" : 5,
    },
    {
        "itemId": 3,
        "itemName": "Himshagor",
        "itemPrice": "400",
        "itemImgPath": cardMangoImage,
        "itemAvailability": false,
        "itemAmount" : 5,
    },
    {
        "itemId": 4,
        "itemName": "Mohonbhog",
        "itemPrice": "400",
        "itemImgPath": cardMangoImage,
        "itemAvailability": true,
        "itemAmount" : 5,
    },
    {
        "itemId": 5,
        "itemName": "Gopalbhog",
        "itemPrice": "400",
        "itemImgPath": cardMangoImage,
        "itemAvailability": true,
        "itemAmount" : 5,
    },
    {
        "itemId": 6,
        "itemName": "Aamrupali",
        "itemPrice": "400",
        "itemImgPath": cardMangoImage,
        "itemAvailability": true,
        "itemAmount" : 5,
    },
    {
        "itemId": 7,
        "itemName": "Khirsapat",
        "itemPrice": "400",
        "itemImgPath": cardMangoImage,
        "itemAvailability": false,
        "itemAmount" : 5,
    },
    {
        "itemId": 8,
        "itemName": "Ashhwina",
        "itemPrice": "400",
        "itemImgPath": cardMangoImage,
        "itemAvailability": true,
        "itemAmount" : 5,
    },
    {
        "itemId": 9,
        "itemName": "Khisanbogh",
        "itemPrice": "400",
        "itemImgPath": cardMangoImage,
        "itemAvailability": false,
        "itemAmount" : 5,
    },
    {
        "itemId": 10,
        "itemName": "Kuapahari",
        "itemPrice": "400",
        "itemImgPath": cardMangoImage,
        "itemAvailability": true,
        "itemAmount" : 5,
    },
]

function loadItems(cart, setItems, setLoading){
    // setItems(items);
    // if(cart != null && cart.length > 0){
    //     const newAmountItems = [...items];
    //     cart.forEach(function (arrayItem) {
    //         const index = items.findIndex(item => arrayItem.id === item.itemId && arrayItem.name === item.itemName);
    //         newAmountItems[index] = {...newAmountItems[index], itemAmount: arrayItem.amount};
    //     });
    //     setItems(newAmountItems);
    // }

    setLoading(true);
    Axios
    .get(`${serverUrl}/product/`)
    .then(({data: res}) => {
        const newItems = res.map((item) => ({
            itemId: item.id,
            itemName: item.name,
            itemImgPath: (item.img? serverUrl+item.img : cardMangoImage),
            // itemImgPath: cardMangoImage,
            itemPrice: item.price,
            itemAvailability: item.availability,
            itemAmount : 5,
        }));
        setItems(newItems);
        if(cart != null && cart.length > 0){
            const newAmountItems = [...items];
            cart.forEach(function (arrayItem) {
                const index = items.findIndex(item => arrayItem.id === item.itemId && arrayItem.name === item.itemName);
                newAmountItems[index] = {...newAmountItems[index], itemAmount: arrayItem.amount};
            });
            setItems(newAmountItems);
        }
        setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      console.log('failed to load items');
    });
}

function Order() {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useLocalStorage("cart");

    useEffect(() => {
        window.scrollTo(0, 0)
        loadItems(cart, setItems, setLoading);
    }, [])

    return (
        <Container fluid="md" className="parentContainer">
            {loading?
            <div className="loadingDiv">
              <Spinner animation="border" role="status"/>
              <h4 className="loadingText"> Loading... </h4>
            </div>
            :
            <div className="orderBody">
                {items.map(item => (
                    <ItemCard itemId={item.itemId} itemImgPath={item.itemImgPath} itemName={item.itemName}
                    itemPrice={item.itemPrice} itemAvailability={item.itemAvailability} itemAmount={item.itemAmount} />
                ))}
            </div>
            }
        </Container>
    );
}

export default Order;