import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import HomePage from '../components/User/HomePage';
import PrivateRoute from './PrivateRoute';
import Home from '../components/User/Home';
import Gradient from '../components/User/Gradient';
import Role from '../components/User/Role';
import Group from '../components/User/Group';
function AppRoute(props) {
    return (
        <>

            <Switch>
                {/* <UserRoute></UserRoute> */}
                <PrivateRoute path="/user" component={HomePage}></PrivateRoute>
                <PrivateRoute path="/role" component={Role}></PrivateRoute>
                <PrivateRoute path="/group" component={Group}></PrivateRoute>
                <Route path="/login">
                    <Login></Login>
                </Route>
                <Route path="/register">
                    <Register></Register>
                </Route>
                <Route path="/gradient">
                    <Gradient></Gradient>
                </Route>
                <Route path="/">
                    <Home></Home>
                </Route>
            </Switch>
        </>
    );
}

export default AppRoute;