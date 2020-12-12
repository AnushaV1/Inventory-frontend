import React from "react";
import {Switch, Redirect, Route } from "react-router-dom";
import Home from "../Home";
import Register from "./Register";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import UpdateProfile from "./UpdateProfile";
import AddItemForm from "./AddItemForm";
import ProductDetails from "./ProductDetails"
const Routes = () => {

    return (
        <div>
        <Switch>
        <Route exact path="/">
        <Home />
            </Route>
            <Route exact path="/register">
                <Register />
            </Route>
            <Route exact path="/login">
                <Login  />
            </Route>
            <PrivateRoute exact path="/dashboard"><Dashboard /></PrivateRoute>
            <PrivateRoute exact path="/profile"><Profile /></PrivateRoute>
            <PrivateRoute exact path="/addItem"><AddItemForm /></PrivateRoute>
            <PrivateRoute path="/profile/:username"><UpdateProfile /></PrivateRoute>
            <PrivateRoute path="/upc/:searchUPC"><ProductDetails /></PrivateRoute>    

        <Redirect to="/" />      
        </Switch>
        </div>
        )

}
export default Routes;