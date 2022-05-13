import React, { useContext } from 'react';
import './Header.css';
import HeaderLogo from '../../assets/header/TajahatHeader.png'
import MobileHeaderLogo from '../../assets/header/nilkhetianMobileLogoHeader.svg'
import { Navbar, Nav, Container, Badge} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Contexts';

function Header() {

    const [cart, setCart] = useContext(CartContext);

    return (
            <Navbar className="navbar navbar-custom" expand="md" sticky="top">
                <Container fluid="md" className="headerContainer">
                    <Navbar.Brand className="webBrand" as={Link} to="/">
                    <img
                        src={HeaderLogo}
                        scale="0.2"
                        alt="Mango Logo"
                    />
                    </Navbar.Brand>
                    <Navbar.Brand className="mobileBrand" as={Link} to="/">
                    <img
                        src={MobileHeaderLogo}
                        width="50"
                        height="50"
                        alt="Mango Logo"
                    />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="collapsedNavbar" id="basic-navbar-nav" >
                    <Nav>
                        <Nav.Link as={Link} to="/">
                            <h5>Home</h5>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/order">
                            <h5>Order</h5>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/cart">
                            <h5>Cart</h5>
                            {cart.length > 0 && <Badge className="cartCounter" pill bg="warning" text="dark"> {cart.length} </Badge>}
                        </Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    );
}

export default Header;