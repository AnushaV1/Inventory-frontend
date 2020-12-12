import React, { useEffect }  from "react";
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import { login } from "../actions/userAction";
import { addAlert } from "../actions/alertActions";
import { loadAllUPC } from "../actions/upcActions";

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(st => st.users.user);

    useEffect(() => {
        async function checkLogin() {
        if (currentUser.username) { 
            history.push('/dashboard');
        }
        }
        checkLogin();
    }, [currentUser.username, history]);

    const initialValues = {
        username: '',
        password: ''
    }
    const validationSchema = Yup.object({
        username: Yup.string().required('Required!'),
        password: Yup.string()
            .min(6)
            .required('Required!'),
        
    })
    const onSubmit = async(values) => {
        try {
        await dispatch(login(values));
        await dispatch(loadAllUPC());
        history.push('/dashboard');
        } catch(err) {
        dispatch(addAlert(`Invalid Username / Password`, 'danger'));
        }        
    }

    return (
        <>
        <div className="container">
        <div className="col-lg-6 offset-lg-3 mt-4">
        <h2>Login</h2>
            <div>
            <Formik initialValues={initialValues} validationSchema= {validationSchema} onSubmit={onSubmit}>
            <Form>
                <div className="form-group mt-4">
            
                    <Field type="text" name="username" className="form-control" placeholder="Username"  />
                    <ErrorMessage name ="username" render={msg => <div className="error">{msg}</div>} />
                    </div>
                <div className="form-group">
                
                    <Field type="password" name="password" className="form-control" placeholder="Password" />
                    <ErrorMessage name ="password" render={msg => <div className="error">{msg}</div>} />
                    </div>
                <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                        Login</button>
                        <Link to="/register" className="btn btn-link">Register</Link>
                        </div>
                        </Form>
                        </Formik>
                </div>
                </div>
                </div>
            </>

    )
}

export default Login;