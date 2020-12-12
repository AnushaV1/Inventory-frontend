import { combineReducers } from 'redux';
import { users }  from "./authReducer";
//import { registration } from "./registrationReducer";
import  { alert }  from "./alertReducer";
import  { upc }  from "./upcReducer";
import { products } from "./userInventoryReducer"

const rootReducer = combineReducers({
   // registration,
    users,
    upc,
    alert,
    products
});

export default rootReducer;