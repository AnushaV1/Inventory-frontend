import React from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "./DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { addUserItem } from "../actions/userInventoryActions";
// import "./AddItemForm.css"

const AddItemForm = ({ addItem }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const initialValues = {
        product_name: "",
        product_price: "",
        purchased_at: "",
        purchase_date: new Date(),
        serial_number: "",
        warranty_period: "",
        return_policy: "",
        manual_link:"",
        receiptImg: "",
        productImg: "",
        upc: ""
    };
    const validationSchema = Yup.object({
        product_name: Yup.string().required('Required!'),
        product_price: Yup.string().required('Required!'),
        purchased_at: Yup.string().required('Required!'),
        serial_number: Yup.string().required('Required!'),
        purchase_date: Yup.string().required('Required!'),
        upc: Yup.string().required('Required!'),
    })

    const onSubmit = (values, {setStatus, setSubmitting}) => {
        const yourDate = values.purchase_date;
        const yourFormattedDate = yourDate.getFullYear() +
        "-"+ (yourDate.getMonth() + 1)   + 
        "-" + yourDate.getDate();
        if(values.receiptImg === "" && values.productImg === "") {
        const updatedValues = {...values, purchase_date:yourFormattedDate}
        setStatus();
        dispatch(addUserItem(updatedValues));
        }
        else {
            let data = new FormData();
            data.append("product_name", values.product_name)
            data.append("product_price", values.product_price)
            data.append("purchased_at", values.purchased_at)
            data.append("purchase_date", yourFormattedDate)
            data.append("serial_number", values.serial_number)
            data.append("warranty_period", values.warranty_period)
            data.append("return_policy", values.return_policy)
            data.append("manual_link", values.manual_link)
            data.append("upc", values.upc)
            if(values.receiptImg !== "") {
                data.append("receiptImg",values.receiptImg)
            }
            if(values.productImg !== "") {
                data.append("productImg", values.productImg)
            }
            setStatus();
            dispatch(addUserItem(data));
        }
        history.push('/dashboard')
    }


    return (
        <div className="container mt-5">
        <h2>Add Items Form</h2>
        <Formik initialValues={initialValues} validationSchema= {validationSchema} onSubmit={onSubmit}>
        {(formProps) => (
        <Form encType="multipart/form-data">
        <div className="row">
        <div className="col">
            <label htmlFor="product_name">Product Name: </label>
            <Field type="text"
                name="product_name"
                id="product_name"
                placeholder="Product Name"
                className="form-control"
                />
                <ErrorMessage name ="product_name" render={msg => <div className="error">{msg}</div>} />
                </div>
                <div className="col">
            <label htmlFor="product_price">Product Price: </label>
            <Field 
                type="text" 
                name="product_price" 
                id="product_price"
                placeholder="Product Price"
                className="form-control" 
            />
            <ErrorMessage name ="product_price" render={msg => <div className="error">{msg}</div>} />
            </div>
            </div>
            <div className="row">
            <div className="col">
            <label htmlFor="purchased_at">Purchased at:  </label>
            <Field 
                type="text" 
                name="purchased_at" 
                id="purchased_at"
                placeholder="Purchased At"
                className="form-control" 
            />
            <ErrorMessage name ="purchased_at" render={msg => <div className="error">{msg}</div>} />
            </div>
            <div className="col">
            <label htmlFor="serial_number">Serial Number: </label>
            <Field
                type="text"
                name="serial_number"
                id="serial_number" 
                placeholder="Serial Number"
                className="form-control" 
            />
            </div>
            </div>
            <div className="row">
            <div className="col">
            <label htmlFor="warranty_period">Warranty Period: </label>
            <Field
                type="text"
                name="warranty_period"
                id="warranty_period" 
                placeholder="Warranty Period"
                className="form-control" 
            />
            </div>
            <div className="col">
            <label htmlFor="return_policy">Return Policy: </label>
            <Field
                type="text"
                name="return_policy"
                id="return_policy" 
                placeholder="Return Policy"
                className="form-control" 
            />
            </div></div>
            <div className="row">
            <div className="col">
            <label htmlFor="manual_link">Manual Link: </label>
            <Field 
                type="text" 
                name="manual_link" 
                id="manual_link"
                placeholder="Manual Link"
                className="form-control" 
            />
            </div> <div className="col">
            <label htmlFor="upc">UPC code: </label>
            <Field 
                type="text" 
                name="upc" 
                id="upc"
                className="form-control"
                placeholder="UPC code" 
            />
            </div>
            </div>
            <div className="row">
            <div className="col">
            <label htmlFor="user_product_image">User Product Image: </label>
            <input 
                type="file" 
                name="productImg" 
                id="productImg"
                placeholder="Add your product Image"
                className="form-control" 
                onChange= {(event)=>
                formProps.setFieldValue("productImg", event.target.files[0])}
            />
            </div>
            <div className="col">
            <label htmlFor="receiptImg">Receipt Image: </label>
            <input
                type="file" 
                name="receiptImg" 
                placeholder="Receipt Image"
                className="form-control" 
                onChange= {(event)=>
                formProps.setFieldValue("receiptImg", event.target.files[0])}
            />
            </div>
            </div>
            <div className="row" style={{ marginTop: '20px'}}>
            <div className="col d-flex justify-left">
            <label className="mr-sm-2" htmlFor="purchase_date">Purchase Date:   </label>
            <DatePicker
                name="purchase_date"
                id="purchase_date" 
                placeholder="Purchase Date"
                className="form-control" 
            /><ErrorMessage name ="purchase_date" render={msg => <div className="error">{msg}</div>} />    
            </div>
            <div className="col justify-right">
            <button type="submit" className="btn btn-primary"> Add Item </button>{'  '}
            <button type="reset" className="btn btn-secondary">Reset</button>
            </div>
            </div>
            </Form>
            )}
            </Formik>
        
        </div>
    
    )
}
export default AddItemForm;


