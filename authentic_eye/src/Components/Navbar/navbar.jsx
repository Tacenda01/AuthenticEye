import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../Images/AuthenticEye.png';
import './navbar.css';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { pathname } = useLocation();
    const navRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (navRef.current && !navRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="nav-container" ref={navRef}>
            <div className="navbar">
                <div className="left-side">
                    <NavLink to="/">
                        <img src={logo} alt="Logo" className="logo" />
                    </NavLink>
                </div>
                <div className="right-side">
                    <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                        <ul>
                            <li><NavLink to="/" className="link" onClick={toggleMenu}>HOME</NavLink></li>
                            <li><NavLink to="/faqs" className="link" onClick={toggleMenu}>FAQs</NavLink></li>
                            <li><NavLink to="/contact" className="link" onClick={toggleMenu}>CONTACT</NavLink></li>
                        </ul>
                    </div>
                    <div className="hamburger-menu" onClick={toggleMenu}>
                        {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Nav;