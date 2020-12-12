import { ADD_UPC_PRODUCT, LOAD_UPC_PRODUCT } from "./actionTypes";
import InventoryApi from "../InventoryApi";
import { addAlert } from "./alertActions";

/* Action to load a upc given a upc code */

export function getUPCFromAPI(upcCode) {
    return async function (dispatch) {
        const res = await InventoryApi.getUPCDetails(upcCode);
        const productDetails = {
        upc_code : res.response.upc,
        title: res.response.title,
        category: res.response.category,
        model: res.response.model,
        brand: res.response.brand,
        image_link: res.response.images[0],
        description: res.response.description
    }
    dispatch(addUPC(productDetails));
    return {productDetails};
    };
}

const addUPC = product => ({
    type: ADD_UPC_PRODUCT,
    product
});


export function loadAllUPC() {
    return async function (dispatch) {
        try {
        const res = await InventoryApi.getAllUPC();
        dispatch(loadUPC(res));
        }catch(err) {
        dispatch(addAlert(`Error loading UPC`, 'danger'));
}
    };
}

const loadUPC = products => ({
    type: LOAD_UPC_PRODUCT,
    products
});