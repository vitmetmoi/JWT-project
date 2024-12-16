import React from 'react';
import { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function PrivateRoute(props) {

    const [account, setAccount] = useState('');
    let history = useHistory();
    useEffect(() => {
        let data = sessionStorage.getItem("account");

        if (!data) {
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