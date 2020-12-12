import React, {useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import {useSelector} from 'react-redux';
import './Home.css';

const Home = () => {
    const history = useHistory();
    const currentUser = useSelector(st => st.users.user);

useEffect(() => {
    async function checkLogin() {
    if (currentUser.username) { 
        history.push('/dashboard');
    }
    }
    checkLogin();
}, [currentUser.username, history]);
    return (
        <section className="Home col-md-12 p-0">
        <div className="banner container-fluid text-center text-light m-0 p-5">
            <div className="content-wrapper mb-5">
            <h1 className="mb-3 font-weight-bold">Inventory</h1>
            <p className="lead">All your inventory in one, convenient place.</p>
            <Link to="/login" className="btn btn-primary btn-lg px-5 py-3 my-5">Log In</Link>
            </div>
        </div>
        </section>
    );
}

export default Home;
