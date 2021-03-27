import React, { useEffect, useState } from 'react';
import {useHistory, Link, useParams } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getUser, updateUser } from '../actions/userAction';
import { addAlert } from "../actions/alertActions";

function UpdateProfile() {
    const dispatch = useDispatch();
    const history = useHistory();
    const  {username} = useParams();
    const { currentUser } = useSelector(st =>st.users.user);
    let currUser;
    const initialValues = {
        firstname: "",
        lastname:  "",
        username: "",
        email: "",
        address: "",
        state: "",
        city:"",
        country: "",
        zipcode:"",
        password:"",
        confirmPassword: ""
    };
    const [user, setUser] = useState(initialValues);
    const [submitting, setSubmitting] = useState(false);

    if(username) {
        currUser = username
    } else {
        currUser = currentUser
    }

    useEffect(() => {
            async function getUserDetails(){
            const userProfile = await dispatch(getUser(currUser))
            setUser(userProfile);
            }
            getUserDetails();
        }, [dispatch, currUser]);


    const savedValues = {
        username: user.username,
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        address: user.address || "",
        state:user.state|| "",
        city:user.city || "",
        country: user.country || "",
        zipcode:user.zipcode || "",
        password: '',
        confirmPassword: ''
    };

    
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        firstname: Yup.string()
            .required('First Name is required'),
        lastname: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        zipcode:Yup.number()
        .positive()
        .integer(),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .when('password', (password, schema) => {
                if (password) return schema.required('Confirm Password is required');
            })
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });

    const onSubmit = async(values) => {
        try {
            setSubmitting(true)
            await dispatch(updateUser(values))
            }catch(err) {
            dispatch(addAlert("Error updating profile", "danger"));  
            } 
            history.push('/dashboard');
    }

    return (
        <Formik initialValues={savedValues || initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
            <Form>
            <div className="container mt-5">
                        <h2>Update Profile</h2>
                        <div className="row mt-4">
                        <div className="col">
                                <label>First Name</label>
                                <Field name="firstname" type="text" className='form-control' />
                                <ErrorMessage name="firstname" component="div" className="invalid-feedback" />
                            </div>
                            <div className="col">
                                <label>Last Name</label>
                                <Field name="lastname" type="text" className='form-control' />
                                <ErrorMessage name="lastname" component="div" className="invalid-feedback" />
                            </div>
                            </div>
                            <div className="row">
                            <div className="col">
                                <label>Username</label>
                                <Field type="text" name="username"
                                        className='form-control'
                                />
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                            </div>
                            <div className="col">
                            <label>Email</label>
                    <Field name="email" type="text" className='form-control' />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                        </div>
                        <div className="row">
                        <div className="col">
                        <label>Address</label>
                        <Field name="address" type="text" className='form-control' />
                        <ErrorMessage name="address" component="div" className="invalid-feedback" />
                    </div>
                    <div className="col">
                    <div className="row">
                    <div className="col">
                    <label>City</label>
                    <Field name="city" type="text" className='form-control' />
                    <ErrorMessage name="city" component="div" className="invalid-feedback" />
                    </div>
                    <div className="col">
                    <label>Zipcode</label>
                    <Field name="zipcode" type="number" className='form-control' />
                    <ErrorMessage name="zipcode" component="div" className="invalid-feedback" />
                    </div>
                    </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col">
                    <label>State</label>
                    <Field name="state" type="text" className='form-control' />
                    <ErrorMessage name="state" component="div" className="invalid-feedback" />
                    </div>
                    <div className="col">
                    <label>Country</label>
                    <Field name="country" type="text" className='form-control' />
                    <ErrorMessage name="country" component="div" className="invalid-feedback" />
                    </div></div>
                    
                    <div className="row">
                    <div className="col">
                                <label>Password</label>
                                <Field name="password" type="password" className='form-control' />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                        
                            <div className="col">
                                <label>Confirm Password</label>
                                <Field name="confirmPassword" type="password" className='form-control' />
                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                            </div>
                            </div>
                            <div className="row mt-4">
                            <div className="col">
                            <button type="submit" disabled={submitting} className="btn btn-primary">
                                {submitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Save
                            </button>
                            <Link to={'..'} className="btn btn-link">Cancel</Link>
                        </div>
                        </div>
                        </div>
                    </Form>            
    </Formik>
    )
    }
export default UpdateProfile ;