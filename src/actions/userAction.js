import {REGISTRATION_SUCCESS, LOGIN_SUCCESS, LOAD_USER,LOGOUT_USER, REMOVE_UPC_PRODUCT, REMOVE_USER_PRODUCT } from "./actionTypes";
import { addAlert } from "./alertActions"
import InventoryApi from "../InventoryApi";

export const logoutUser = () => {
    return async function (dispatch) {
    localStorage.removeItem('inventory-token');
    await dispatch(userLogout());
    await dispatch(removeUPC());
    await dispatch(removeUserProduct());
    }
}

export const registerUser = (data) => {
    return async function (dispatch) {
            const res = await InventoryApi.register(data);
            localStorage.setItem("inventory-token", res.token)
            await dispatch(addAlert(`Thank you for registering ${res.username}!`, "success"));
            await dispatch(registerSuccess(res));
        }
        
    }
    
    export const login = (data) => {
        return async function (dispatch) {
            const res = await InventoryApi.login(data);   
            localStorage.setItem("inventory-token", res.token)
            await dispatch(loginSuccess(res));
            return dispatch(addAlert(`Welcome back ${res.username}!`, "success"));  
            }
    }

    export const getUser = (username) => {

        return function (dispatch) {
        
            try {
            const res = InventoryApi.getUser(username);   
            return res;
        
            } catch(err) {
                dispatch(addAlert(err, "danger"));  
            }
        }
    }

    export const updateUser = (data) => {  
        return async function (dispatch) {
                await InventoryApi.updateUser(data.username, data)
                return dispatch(addAlert(`User updated successfully`, "success")); 
            }
    }

    export const removeUser = (username) => {
        return async function (dispatch) {
                await InventoryApi.deleteUser(username);
                await dispatch(userLogout());                
                localStorage.removeItem('inventory-token');
                return dispatch(addAlert('User deleted!'));
        };
    };
    
export const loadUser= (user) => {
        return { 
            type: LOAD_USER,
            payload: user
        };
    }


const registerSuccess = user => ({
    type: REGISTRATION_SUCCESS,
    payload: user
});


const loginSuccess = user => ({
    type: LOGIN_SUCCESS,
    payload: user    
});


const userLogout = () => ({
    type: LOGOUT_USER   
});

const removeUPC = () => ({
    type: REMOVE_UPC_PRODUCT
})

const removeUserProduct = () => ({
    type: REMOVE_USER_PRODUCT
})

