import React, {useEffect} from "react";
import {useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../actions/userAction";
import { addAlert } from "../actions/alertActions";

const Register = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(st => st.users.user);
    useEffect(() => {
        async function checkUser() {
        if (currentUser.username) { 
            history.push('/dashboard');
        }
        }
        checkUser();
    });

    const initialValues = {
        firstname: '',
        lastname:  '',
        username: '',
        password: '',
        email:''
    }
    
    const validationSchema = Yup.object({
        firstname: Yup.string().required('Required!'),
        lastname: Yup.string().required('Required!'),
        username: Yup.string().required('Required!'),
        password: Yup.string()
            .min(6)
            .required('Required!'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Required!')
    })

    const onSubmit = async(values) => {
        try {
            await dispatch(registerUser(values));
            history.push('/dashboard');
        }catch(errors) {
		//	errors.forEach((e) => {
				dispatch(addAlert(`Username/email already exists!`, 'warning'));
		//	});
    }
}
    
    return (
        <div className="container">
        <div className="col-lg-6 offset-lg-3">
        <h2>Register</h2>
        <Formik initialValues={initialValues} validationSchema= {validationSchema} onSubmit={onSubmit}>
            <Form>
                <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <Field type="text" name="firstname"
                    placeholder="First Name" 
                    className='form-control'
                />
                <ErrorMessage name ="firstname" render={msg => <div className="error">{msg}</div>} />
            
            </div>
            <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <Field type="text" name="lastname"  placeholder="Last Name"
                    className='form-control' />
                    <ErrorMessage name ="lastname"  render={msg => <div className="error">{msg}</div>} />
            </div>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field type="text" name="username"  placeholder="Username"
                    className='form-control'
                />
                <ErrorMessage name ="username" render={msg => <div className="error">{msg}</div>} />
            
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" placeholder="Password"
                    className='form-control' />
                    <ErrorMessage name ="password" render={msg => <div className="error">{msg}</div>} />
            </div>
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="text" name="email"
                    placeholder="Email" className='form-control'
                />
                <ErrorMessage name ="email" render={msg => <div className="error">{msg}</div>} />
            </div>
                    
            <div className="form-group">
                <button type="submit" className="btn btn-primary">
            
                    Register
                </button>{' '}
                <button type="reset" className="btn btn-secondary">Reset</button>
                </div>
        </Form>
        </Formik>
    </div>
    </div>
    )
}

export default Register;
