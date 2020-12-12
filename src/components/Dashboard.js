import React, {useEffect, useState} from "react";
import { useHistory, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../actions/userInventoryActions";
import UserProductTable from "./UserProductTable";

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(st => st.users.user);
    const userId = currentUser.userid;
    const  products = useSelector(st =>st.products) 

    
    useEffect(() => {
        async function checkLogin() {
        if (!currentUser.username) { 
            history.push('/login');
        }
        }
        checkLogin();
    });
    
    useEffect(() => {
            async function getUserProducts(){
                await dispatch(getProducts(userId))
                setIsLoading(true);
            }
            setIsLoading(false);
            getUserProducts();
        }, [dispatch, userId]);

    
        if (!isLoading) {
            return <p>Loading &hellip;</p>;
        }

        if(products.length === 0) {
            return (
                <>
                <div role="alert" className="alert alert-danger">No products added!</div>
                <div><Link to="/addItem" className="btn btn-info">Add Product</Link></div>
                </>
                )
        }

        return (
        <UserProductTable products={products} />
        )


}

export default Dashboard;