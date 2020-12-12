import {LOAD_USER_PRODUCT, ADD_USER_PRODUCT, UPDATE_USER_PRODUCT, DELETE_USER_PRODUCT, REMOVE_USER_PRODUCT} from "../actions/actionTypes";

const initialState = [];

export function products(state = initialState, action) {

    switch (action.type) {

        case LOAD_USER_PRODUCT:
            return [...action.products];

        case ADD_USER_PRODUCT:
            return [...state, action.product]
        
        case UPDATE_USER_PRODUCT:
            return state.map((product) =>
            product.id === action.product.id ? action.product : product
            );

        case DELETE_USER_PRODUCT:
            return state.filter((product) => product.id !== action.productId);

        case REMOVE_USER_PRODUCT:
            return initialState;

        default:
            return state;
    }
}

