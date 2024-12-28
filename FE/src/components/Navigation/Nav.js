import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Nav.scss'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UserContext } from '../../store/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHippo, faPlane, faUser } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Nav = (props) => {


    const { user, login, logout } = useContext(UserContext);
    const location = useLocation();
    const [selectedOption, setSelectedOption] = useState('');
    console.log('loca', location)
    if (location && location.pathname !== '/login') {


        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid nav-container ">
                    <div className=' '> <Link to='/home' class="navbar-brand " href="#">JsonWebToken</Link></div>

                    <div className='dropdown-mobile d-block d-sm-none ml-5'>
                        <DropdownButton id="dropdown-basic-button" title="Menu">
                            <Dropdown.Item ><Link to="/home" class="nav-link" aria-current="page" href="#">Home</Link></Dropdown.Item>
                            <Dropdown.Item ><Link to='/user' class="nav-link" href="#">User</Link></Dropdown.Item>
                            <Dropdown.Item ><Link to='/project' class="nav-link" href="#">Project</Link></Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item ><Link to='/project' class="nav-link" href="#">Logout</Link></Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div class="nav-items d-none d-sm-block " id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link to="/home" class="nav-link" aria-current="page" href="#">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/user' class="nav-link" href="#">User</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/project' class="nav-link" href="#">Project</Link>
                            </li>

                        </ul>
                    </div>

                    <div className='middle-icon d-none d-sm-block'>
                        <FontAwesomeIcon className='hippo' icon={faHippo} />
                    </div>

                    <div className='account-dropdown d-none d-sm-block'>
                        {/* <Select
                            value={selectedOption}
                            onChange={''}
                            options={options}
                        /> */}
                        <DropdownButton id="dropdown-basic-button" title={<FontAwesomeIcon className='account-icon' icon={faUser} />}>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </DropdownButton>
                    </div>


                </div>
            </nav>

        );
    }
    else {
        return (
            <></>
        )
    }

}

export default Nav;