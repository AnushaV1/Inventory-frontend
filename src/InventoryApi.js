import axios from "axios";

//const BASE_URL =  process.env.BASE_URL || 'http://localhost:3001';
const BASE_URL = process.env.REACT_APP_BACKEND_URL ||  'https://anusha-inventory.herokuapp.com';


class InventoryApi {
    static async request(endpoint, params = {}, verb = "get") {
        let _token = localStorage.getItem('inventory-token');
        console.debug("API Call:", endpoint, params, verb);
        let q;

        if (verb === "get") {
            q = axios.get(
            `${BASE_URL}/${endpoint}`, { params: { _token, ...params } });
        } else if (verb === "post") {
            q = axios.post(
            `${BASE_URL}/${endpoint}`, { _token, ...params });
        } else if (verb === "patch") {
            q = axios.patch(
            `${BASE_URL}/${endpoint}`, { _token, ...params });
        } else if (verb === "delete") {
            q = axios.delete(
            `${BASE_URL}/${endpoint}`, { _token });
        }

    
        try {
            return (await q).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async register(data) {
        let res = await this.request(`users`, data, 'post');
        return res;
    }
    static async login(data){
        let res = await this.request('login',data, 'post');
        return res;
    }

    static async getUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    static async updateUser(username, data) {
        let res = await this.request(`users/${username}`, data, 'patch');
        return res;
    }

    static async deleteUser(username) {
        let res = await this.request(`users/${username}`, {}, 'delete');
        return res;
    }

    static async getProducts(userId) {
        let res = await this.request(`product/${userId}`)
        return res;
    }

    static async deleteSingleProduct(userId,productId) {
        let res = await this.request(`product/${userId}/${productId}`, {},'delete')
        return res;
    }

    static async updateSingleProduct(productId, data){
        let res = await this.request(`product/${productId}`,data,'patch')
        return res;
    }

    static async getUPCDetails(upcCode) {
        let res = await this.request(`api/upc/${upcCode}`);
        return res;
    }

    static async getAllUPC(){
        let res = await this.request(`api/upc/`)
        return res;
    }

}

export default InventoryApi;
