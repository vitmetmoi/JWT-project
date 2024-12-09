import React from 'react';
import './Nav.scss'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
const Nav = (props) => {
    return (
        <div className='navigation-container'>
            <ul>
                <li><Link className="active" to="/home">Home</Link></li>
                <li><Link to="/news">News</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </div>
    );
}

export default Nav;