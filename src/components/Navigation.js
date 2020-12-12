import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import homeInventoryLogo from "../images/homeInventoryLogo.jpg";
import { logoutUser } from "../actions/userAction";
import Search from "./Search";
import './Navigation.css';


    const Navigation = () => {
        const currentUser = useSelector(st => st.users.user);
        const dispatch = useDispatch();
        const history = useHistory();

        const logout = async() => {
            await dispatch(logoutUser());
            history.push("/")
        }

    return (
    <>
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
    <div className="container-fluid">
    <div className="navbar-header">
    <NavLink to="/" className="navbar-brand">
    <img src={homeInventoryLogo} alt="Home Inventory Logo"/>My Home Inventory
    </NavLink>
    </div>    
        {currentUser.username ? ( 
            <>
            <Search />
    
        <ul className="navbar-nav navbar-right"> 
        <li className="nav-item">
        <NavLink className="nav-link" to="/dashboard">Dashboard </NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link" to="/profile">Profile </NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link" to="/addItem">Add Product </NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to='/login' onClick={logout}>Logout</NavLink>
        </li>
        </ul>        
        </>
        ) : (
            <>
        <ul className="nav navbar-nav navbar-right"> 
        <li className="nav-item"><NavLink className="nav-link" to="/register">Register</NavLink></li>
        <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
        </ul>
        </> ) 
        }
        </div>
    </nav>
    </>
    )
}

export default Navigation;