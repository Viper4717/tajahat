import React, { useEffect } from 'react';
import './Home.css';
import slideImage1 from '../../assets/home/slideImage1.png';
import slideImage2 from '../../assets/home/slideImage2.png';
import slideImage3 from '../../assets/home/slideImage3.png';
import homeImage1 from '../../assets/home/mangoImage.jpg';
import homeImage2 from '../../assets/home/mangoImage2.jpg';
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
            <div className='carouselDiv'>
                <Carousel>
                    <Carousel.Item interval={5000}>
                        <img
                        className="carouselImage"
                        src={slideImage1}
                        alt="First slide"
                        />
                        {/* <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <img
                        className="carouselImage"
                        src={slideImage2}
                        alt="Second slide"
                        />
                        {/* <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <img
                        className="carouselImage"
                        src={slideImage3}
                        alt="Third slide"
                        />
                        {/* <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className="homeBodyContainer">
                <div className="homeBody">
                    <div className="homeBodyImageDivLeft" data-aos="fade-right">
                        <img
                        className="homeImage"
                        src={homeImage1}
                        alt="mango"
                        />
                    </div>
                    <div className="homeBodyText" data-aos="fade-left">
                        We are Tajahat, an organic marketplace vowed to supply fresh and authentic foods to our valuable customers.
                        We are involved in mango farming in Chapainawabganj for four generations. In the first attempt, we've decided
                        to supply the premium quality fresh mangoes from our orchards. Please stay with us for authentic taste and free from adulteration.
                    </div>
                </div>
                <div className="homeBody">
                    <div className="hiddenHomeBodyImageDiv" data-aos="fade-right">
                        <img
                        className="homeImage"
                        src={homeImage1}
                        alt="mango"
                        />
                    </div>
                    <div className="homeBodyText" data-aos="fade-right">
                        Mango Growing Bags, also named as Mango Protection Bags, Bagging mango on the tree is an organic method and an effective alternative
                        to chemical pesticides. Bagging prevents insect pests, especially fruit flies from finding and damaging the fruits. The bag provides
                        physical protection from mechanical injuries (scars and scratches) and prevents female flies' laying activities, latex burns, and fungal
                        spots on the fruits. Although laborious, it is cheaper, safer, easier to do, and gives us a more reliable estimate of our projected harvest.
                        Which implies the product to be 100% organic.
                    </div>
                    <div className="homeBodyImageDivRight" data-aos="fade-left">
                        <figure className='figureDiv'>
                            <img
                            className="homeImage"
                            src={homeImage2}
                            alt="mango"
                            />
                            <figcaption>Organic Farming</figcaption>
                        </figure>
                    </div>
                    <div className="hiddenHomeBodyImageDiv" data-aos="fade-left">
                        <figure className='figureDiv'>
                            <img
                            className="homeImage"
                            src={homeImage2}
                            alt="mango"
                            />
                            <figcaption>Organic Farming</figcaption>
                        </figure>
                    </div>
                </div>
                <div className="fullHomeBodyText" data-aos="fade-right">
                    Mangoes provided by us:
                    <ul>
                        <li>Khirsapat</li>
                        <li>Lengra</li>
                        <li>Gopalbhog</li>
                        <li>Kalibhog</li>
                        <li>Fazli</li>
                        <li>Aamrupali</li>
                        <li>Ashwina</li>
                        <li>Lokkhonbhog</li>
                        <li>Guti</li>
                    </ul>
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