import React from 'react';
import './Footer.css'
import { Container } from 'react-bootstrap';
import { FaFacebookSquare } from 'react-icons/fa';

function Footer() {
  return (
    <div className="footerBG">
      <Container fluid="md" className="footerContainer">
        <div className="footerLeft">
          <div className="footerTop">
            <text className="footerTitle">Tajahat</text><br/>
          </div>
          <div className="footerMiddle">
            <text>Chapainawabganj, Rajshahi</text>
          </div>
          <div className="footerBottom">
            <a href="https://www.facebook.com/tajahat/" target="_blank">
              <FaFacebookSquare size='2.5em'/>
            </a>
          </div>
        </div>
        <div className="footerRight">
          <div className="footerTop">
            {/* <text className="invisibleFooterTitle"></text><br/> */}
            <text className="footerSecondaryTitle">Contact Us</text>
          </div>
          <div className="footerMiddle">
            <text>+8801722669933</text><br/>
            {/* <text>borobhai@gmail.com</text> */}
          </div>
          <div className="footerBottom">
            <text>All Rights Reserved</text><br/>
            <text>Tajahat © 2022</text>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
