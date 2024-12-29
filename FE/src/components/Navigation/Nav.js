import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Nav.scss'
import { useHistory, BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UserContext } from '../../store/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHippo, faPlane, faUser, faSnowflake } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { logoutService } from '../../service/userService';
const Nav = (props) => {


    const { user, login, logout } = useContext(UserContext);
    const location = useLocation();
    const [selectedOption, setSelectedOption] = useState('');
    let history = useHistory();
    console.log('user', user)


    const handleOnClickLogout = async () => {
        try {
            let res = await logoutService();
            if (res && res.data.EC === 0) {
                history.push('/login')
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    if (location && location.pathname !== '/login') {


        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid nav-container ">
                    <div className=' '> <Link to='/home' class="navbar-brand " >JsonWebToken</Link></div>

                    <div className='dropdown-mobile d-block d-sm-none ml-5'>
                        <DropdownButton id="dropdown-basic-button" title="Menu">
                            <Dropdown.Item ><Link to="/home" class="nav-link" aria-current="page" >Home</Link></Dropdown.Item>
                            <Dropdown.Item ><Link to='/user' class="nav-link" >User</Link></Dropdown.Item>
                            <Dropdown.Item ><Link to='/project' class="nav-link" >Project</Link></Dropdown.Item>
                            <Dropdown.Divider />
                            {
                                user.auth === true ?
                                    < Dropdown.Item onClick={() => handleOnClickLogout()} >Logout</Dropdown.Item>
                                    : < Dropdown.Item onClick={() => { history.push('/login') }} >Login</Dropdown.Item>
                            }
                        </DropdownButton>
                    </div>
                    <div class="nav-items d-none d-sm-block " id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link to="/home" class="nav-link" aria-current="page" >Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/user' class="nav-link" >User</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/role' class="nav-link" >Role</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/project' class="nav-link" >Project</Link>
                            </li>


                        </ul>
                    </div>

                    {/* <div className='middle-icon d-none d-sm-block'>
                        <FontAwesomeIcon className='hippo' icon={faHippo} />
                    </div> */}
                    <div
                        onClick={() => { history.push('/gradient') }}
                        className='middle-icon d-none d-sm-block'>
                        <FontAwesomeIcon className='hippo' icon={faSnowflake} />
                    </div>

                    <div className='account-dropdown d-none d-sm-block'>
                        {/* <Select
                            value={selectedOption}
                            onChange={''}
                            options={options}
                        /> */}
                        <DropdownButton id="dropdown-basic-button" title={<FontAwesomeIcon className='account-icon' icon={faUser} />}>
                            <Dropdown.Item >Hello{user.account.userName ? ', ' + user.account.userName : ''} </Dropdown.Item>

                            <Dropdown.Divider />
                            {
                                user.auth === true ?
                                    < Dropdown.Item onClick={() => handleOnClickLogout()} >Logout</Dropdown.Item>
                                    : < Dropdown.Item onClick={() => { history.push('/login') }} >Login</Dropdown.Item>
                            }

                        </DropdownButton>
                    </div>


                </div>
            </nav >

        );
    }
    else {
        return (
            <></>
        )
    }

}

export default Nav;