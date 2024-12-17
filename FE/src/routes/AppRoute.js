import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import UserRoute from './UserRoute';
import HomePage from '../components/User/HomePage';
import PrivateRoute from './PrivateRoute';
function AppRoute(props) {
    return (
        <>asd

            <Switch>
                {/* <UserRoute></UserRoute> */}
                <PrivateRoute path="/user" component={HomePage}></PrivateRoute>
                <Route path="/login">
                    <Login></Login>
                </Route>
                <Route path="/register">
                    <Register></Register>
                </Route>
                <Route path="/">
                    <Login></Login>
                </Route>
            </Switch>
        </>
    );
}

export default AppRoute;