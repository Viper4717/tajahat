import React, { useEffect } from 'react';
import './Home.css';
import slideImage1 from '../../assets/home/mangoImage.jpg';
import slideImage2 from '../../assets/home/mangoImage.jpg';
import slideImage3 from '../../assets/home/mangoImage.jpg';
import {Container, Carousel, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';

function Home() {

    useEffect(() => {
        window.scrollTo(0, 0)
        Aos.init({
            duration: 1000
        });
    }, [])

  return (
    <div className="Home">
        <Container fluid="md" className="parentContainer padBottomContainer">
            <Carousel>
                <Carousel.Item interval={5000}>
                    <img
                    className="carousalImage"
                    src={slideImage1}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <img
                    className="carousalImage"
                    src={slideImage2}
                    alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <img
                    className="carousalImage"
                    src={slideImage3}
                    alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div className="homeBodyContainer">
                <div className="homeBody">
                    <div className="homeBodyImageDivLeft" data-aos="fade-right">
                        <img
                        className="homeImage"
                        src={slideImage1}
                        alt="mango"
                        />
                    </div>
                    <div className="homeBodyText" data-aos="fade-left">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
                    specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                </div>
                <div className="homeBody">
                    <div className="hiddenHomeBodyImageDiv" data-aos="fade-left">
                        <img
                        className="homeImage"
                        src={slideImage1}
                        alt="mango"
                        />
                    </div>
                    <div className="homeBodyText" data-aos="fade-right">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
                    specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                    <div className="homeBodyImageDivRight" data-aos="fade-left">
                        <img
                        className="homeImage"
                        src={slideImage1}
                        alt="mango"
                        />
                    </div>
                </div>
                <div className="orderButtonDiv">
                    <Button className="orderButton" variant="custom" as={Link} to="/order">
                        Order Now
                    </Button>
                </div>
            </div>
        </Container>
    </div>
  );
}

export default Home;