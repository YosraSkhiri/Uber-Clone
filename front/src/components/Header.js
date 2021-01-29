import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Header_img from '../assets/images/header_img.webp';

const Header = () => {
    const isLogged = useSelector(state => state.login);

    return(
        <header className="header-container">
            <div className="header-content">
                <h1 className="heading-1 header-heading">Always the ride you want</h1>
                <p className="paragraph paragraph--mr-b">Request a ride, hop in, and relax.</p>
                {
                    !isLogged ?
                    <Link to="/signup" className="btn-black btn--rect-m">Sign up to ride</Link>
                    : null
                }
            </div>
            <div>
                <img src={Header_img} alt="Two girls waiting for a cab."/>
            </div>
        </header>
    );
}

export default Header;
