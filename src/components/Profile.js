import React, {useEffect, useState} from "react";
import {useSelector, useDispatch } from 'react-redux';
import {useHistory, Link} from 'react-router-dom';
import { getUser,removeUser } from '../actions/userAction';
import { addAlert } from "../actions/alertActions";



const Profile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(st=>st.users.user);
    const [user, setUser] = useState({})
    useEffect(() => {
        async function getUserDetails(){
            try {
        const userProfile = await dispatch(getUser(currentUser.username))
        setUser(userProfile);
    } catch(err) {
        setUser("");
    }
        }
        getUserDetails();
        }, [history, currentUser, dispatch]);

        async function deleteUser() {
            try {
            await dispatch(removeUser(currentUser.username));
            history.push('/');
        } catch(err){
            dispatch(addAlert(`${currentUser.username} does not exist`, 'danger'));
        }
        }

    return (
        <div className="card">
        <div className="card-header">
        <h4 className="card-title">  {user.username} </h4>
        </div>
        <div className="card-body">
            <h5 className="card-title"> {user.firstname} {user.lastname} </h5>
            <p className="card-text">Email - {user.email}</p>
            <p className="card-text">{user.address}</p>
            <p className="card-text">{user.city}  {user.state}</p>
            <p className="card-text">{user.country} {user.zipcode}</p>
        <Link  className="btn btn-primary" role="button" to={`/profile/${user.username}`}> Update Profile </Link>{'   '}
        <button className="btn btn-primary" onClick={deleteUser}>Delete User</button>
        </div>
        </div>
    
    )
}
export default Profile;

