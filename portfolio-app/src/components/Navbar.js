import React, {useState} from "react";
import { Link } from 'react-router-dom';
import '../css/navbar.css';
import {Navbar, NavbarBrand, Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';

const NavBar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [fade, setFade] = useState('');

    const toggle = () => setDropdownOpen(!dropdownOpen);

    const handleScroll = () => {
        if(window.scrollY > 0 && fade !== 'fadein') {
            setFade('fadein')
        } else if(window.scrollY <= 0) {
            setFade('fadeout')
        }
    }

    window.addEventListener('scroll', handleScroll);

    return(
        <div className={`${fade} navbarContainer`}>
            <Navbar light expand='xs' className='navbar'>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <Link to="/home" className="nav-link">
                            Home
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/flower-cup" className="nav-link">
                            Flower Animation
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to='/what-we-do' className='nav-link'>
                            What We Do
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to='/industries' className='nav-link'>
                            Industries
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to='/certifications' className='nav-link'>
                            Certifications
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/contact" className="nav-link">
                            Contact Us
                        </Link>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavBar;