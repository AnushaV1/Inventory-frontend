import { combineReducers } from 'redux';
import { users }  from "./authReducer";
import  { alert }  from "./alertReducer";
import  { upc }  from "./upcReducer";
import { products } from "./userInventoryReducer"

const rootReducer = combineReducers({

    users,
    upc,
    alert,
    products
});

export default rootReducer;