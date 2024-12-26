import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Route, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from '../store/UserContext';

function PrivateRoute(props) {
    const [account, setAccount] = useState('');
    const { user, login, logout } = useContext(UserContext);
    let history = useHistory();

    useEffect(() => {
        let data = user;
        console.log('data', data)
        if (!data || data.auth === false) {
            history.push('/login');
        }
    }, [])

    return (
        <>
            <Route path={props.path} component={props.component}></Route>
        </>
    );
}

export default PrivateRoute;