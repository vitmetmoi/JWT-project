import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Nav.scss'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { UserContext } from '../../store/UserContext';


const Nav = (props) => {
    const { user, login, logout } = useContext(UserContext);
    const location = useLocation();

    console.log('loca', location)
    if (location && location.pathname !== '/login') {


        return (
            <div className='navigation-container'>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/user">Users</Link></li>
                    <li><Link to="/contact">Project</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </div>

        );
    }
    else {
        return (
            <></>
        )
    }

}

export default Nav;