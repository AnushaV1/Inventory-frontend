import React from "react";
import { Route, Redirect } from "react-router-dom";
import {useSelector} from 'react-redux';

const PrivateRoute = ({exact, path, children}) => {
    const user = useSelector(st => st.users.user);
if(!user.username) {
    return <Redirect to="/login" />
}
    return (
        <Route exact={exact} path={path}>
        {children}
        </Route>
    )
}

export default PrivateRoute;