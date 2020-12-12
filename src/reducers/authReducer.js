import {REGISTRATION_SUCCESS, REGISTRATION_FAILURE, LOGIN_SUCCESS, LOGIN_FAILURE, LOAD_USER, LOGOUT_USER} from "../actions/actionTypes";

const initialState = { isLoggedIn: false, user:[]};

export function users(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {

        case REGISTRATION_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload
            }

        case REGISTRATION_FAILURE:
            return {
            ...state,
            isLoggedIn: false,
        }
        
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                user:[]
                };

        case LOAD_USER:
        return {
            ...state,
            isLoggedIn: true,
            user: payload
            };

        case LOGOUT_USER:
            return initialState;
            
        default:
            return state;
    }
}

