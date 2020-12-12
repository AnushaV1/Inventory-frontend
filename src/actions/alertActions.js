import { ADD_ALERT, REMOVE_ALERT } from "./actionTypes";

/* Actions to add alerts and remove all alerts */

export function addAlert(message, type) {
    return { type: ADD_ALERT, payload: {message, type} };
}

export function removeAlert() {
    return { type: REMOVE_ALERT };
}
