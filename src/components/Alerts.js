import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeAlert } from '../actions/alertActions';
import { v4 as uuid } from 'uuid';

const Alerts = () => {
    const dispatch = useDispatch();
    const alerts = useSelector(st => st.alert);
    useEffect(() => {
        if (alerts[0]) {
            setTimeout(function() {
            dispatch(removeAlert());
        },5000);
        }    
    })
    if (!alerts) {
        return null
    } else {
        return (
            <div>
            { alerts.map(a => (
                <div className= {`alert alert-${a.type}`} key={uuid()} role="alert">{a.message}</div>
            ))}
    </div>
)}
}


export default Alerts;
