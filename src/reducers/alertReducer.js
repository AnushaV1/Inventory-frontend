import {ADD_ALERT, REMOVE_ALERT} from "../actions/actionTypes";

const INITIAL_STATE = [];

export function alert(state = INITIAL_STATE, action) {

    switch (action.type) {

    case ADD_ALERT:
        return [...state, action.payload];

    case REMOVE_ALERT:
        return INITIAL_STATE;

    default:
        return state;
    } 
}
