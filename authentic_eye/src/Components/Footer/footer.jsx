import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <h3>About Us</h3>
                    <p>Protecting digital integrity through AI-based deepfake scanning and detection tools.</p>
                </div>
                <div className="footer-column">
                    <h3>Contact Us</h3>
                    <p><FontAwesomeIcon icon={faEnvelope} /> authenticeye@gmail.com</p>
                    <p><FontAwesomeIcon icon={faPhone} /> +91 94XXXXXXXX</p>
                </div>
                <div className="footer-column">
                    <h3>Join Our Newsletter</h3>
                    <input type="email" placeholder="Enter your email" />
                    <button>Subscribe</button>
                </div>
            </div>
            <div className="footer-copyright">
                <p>&copy; {new Date().getFullYear()} AuthenticEye. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;