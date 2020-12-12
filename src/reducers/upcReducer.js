import { ADD_UPC_PRODUCT, LOAD_UPC_PRODUCT, REMOVE_UPC_PRODUCT } from "../actions/actionTypes";

/* Reducer for upc */

const INITIAL_STATE = [];

export function upc(state = INITIAL_STATE, action) {
    switch (action.type) {
    case LOAD_UPC_PRODUCT:
            return [...action.products];

    case ADD_UPC_PRODUCT:
        return [...state, action.product];

    case REMOVE_UPC_PRODUCT:
        return INITIAL_STATE;

    
    default:
        return state;
    }
}

