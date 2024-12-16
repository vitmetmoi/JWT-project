import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import HomePage from '../components/User/HomePage';
import PrivateRoute from './PrivateRoute'
function UserRoute(props) {
    return (
        <>
            <PrivateRoute path="/user" component={HomePage}></PrivateRoute>
        </>
    );
}

export default UserRoute;