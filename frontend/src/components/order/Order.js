import React, { useState, useEffect } from 'react';
import './Order.css';
import { Container, Spinner } from 'react-bootstrap';
import ItemCard from '../itemCard/ItemCard';
import cardMangoImage from '../../assets/order/cardMangoImage.jpg';
import Axios from 'axios';
import { serverUrl } from '../../util';

const items = [
    {
        "itemId": 1,
        "itemName": "Fajli",
        "itemPrice": "200",
    },
    {
        "itemId": 2,
        "itemName": "Lengra",
        "itemPrice": "400",
    },
    {
        "itemId": 3,
        "itemName": "Himshagor",
        "itemPrice": "400",
    },
    {
        "itemId": 4,
        "itemName": "Mohonbhog",
        "itemPrice": "400",
    },
    {
        "itemId": 5,
        "itemName": "Gopalbhog",
        "itemPrice": "400",
    },
    {
        "itemId": 6,
        "itemName": "Aamrupali",
        "itemPrice": "400",
    },
    {
        "itemId": 7,
        "itemName": "Khirsapat",
        "itemPrice": "400",
    },
    {
        "itemId": 8,
        "itemName": "Ashhwina",
        "itemPrice": "400",
    },
    {
        "itemId": 9,
        "itemName": "Khisanbogh",
        "itemPrice": "400",
    },
    {
        "itemId": 10,
        "itemName": "Kuapahari",
        "itemPrice": "400",
    },
]

function loadItems(setItems, setLoading){
    // setItems(items);

    setLoading(true);
    Axios
    .get(`${serverUrl}/product`)
    .then(({data: res}) => {
      const newItems = res.results.map((item) => ({
        itemId: item.id,
        itemName: item.name,
        // itemImgPath: (item.img? serverUrl+item.img : cardMangoImage),
        itemImgPath: cardMangoImage,
        itemPrice: item.price,
      }));
      setItems(newItems);
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

    useEffect(() => {
        window.scrollTo(0, 0)
        loadItems(setItems, setLoading);
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
                    <ItemCard itemId={item.itemId} itemImgPath={cardMangoImage} itemName={item.itemName} itemPrice={item.itemPrice}/>
                ))}
            </div>
            }
        </Container>
    );
}

export default Order;