import {ADD_USER_PRODUCT, LOAD_USER_PRODUCT, UPDATE_USER_PRODUCT, DELETE_USER_PRODUCT } from "./actionTypes";
import { addAlert } from "./alertActions"
import InventoryApi from "../InventoryApi";
import Axios from "axios";
//const API_URL =  process.env.BASE_URL || 'http://localhost:3001';
const API_URL = process.env.REACT_APP_BACKEND_URL ||  'https://anusha-inventory.herokuapp.com';


export const addUserItem = (data) => {
    return async function (dispatch) {
        try {
            let _token = localStorage.getItem("inventory-token")
            const res = await Axios.post(`${API_URL}/product/addProduct?_token=${_token}`, data)
            await dispatch(addProduct(res.data))
            dispatch(addAlert(`Product Added`, 'success'));
        }catch(err) {
            dispatch(addAlert(`Unable to add product ${err}`, 'danger'));
    }
    }
        
}
const addProduct = product => ({
    type: ADD_USER_PRODUCT,
    product
});


    export const getProducts = (userId) => {
        return async function (dispatch) {
                let userProducts = await InventoryApi.getProducts(userId);
                return await dispatch(loadProducts(userProducts))
                
            }
        }

    const loadProducts = products => ({
        type: LOAD_USER_PRODUCT,
        products
    });


    export const updateSingleRow = (productId, columnId, value) => {
        return async function (dispatch) {
                let data = {}
                data[columnId] = value;
                let userProducts = await InventoryApi.updateSingleProduct(productId, data);
                return await dispatch(updateProduct(userProducts))
        
            }
                    
        }

        const updateProduct = product => ({
            type: UPDATE_USER_PRODUCT,
            product
        });


    export const deleteSingleRow = (userId,productId) => {
        return async function (dispatch) {
                await InventoryApi.deleteSingleProduct(userId, productId);
                return await dispatch(deleteProduct(productId))
            }
                
    }

    const deleteProduct = productId => ({
        type: DELETE_USER_PRODUCT,
        productId
    });

    export const showReceiptImage = (filename) => {
        return async function (dispatch) {
            try { 
                const res = await Axios.get(`${API_URL}/public/${filename}`, {responseType: 'blob'})
                const imageUrl = URL.createObjectURL(res.data);
                return (imageUrl)
                } catch(error) {
                    dispatch(addAlert(`Error fetching the image`, 'danger'));
    }
    
    }
        
}



