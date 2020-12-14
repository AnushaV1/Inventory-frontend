import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUPCFromAPI } from "../actions/upcActions";
import UpcProductDisplay from "./UpcProductDisplay";
import { addAlert } from "../actions/alertActions";


const ProductDetails = () => {
    const [product, setProduct] = useState({})
    const { searchUPC } = useParams();
    const dispatch = useDispatch();
    const upcList = useSelector(st=> st.upc);
        
    useEffect(function() {
        let storeUpc; 
        for(let upcObj of upcList){
        if(upcObj.upc_code === searchUPC) {
        storeUpc = searchUPC
        setProduct(upcObj)
        }
    }
    async function getUPC() {    
        try { 
        let res = await dispatch(getUPCFromAPI(searchUPC));
        setProduct(res)
    } catch(err){
        dispatch(addAlert(`${err}`, 'danger'));
        setProduct("")
    }

    }
        if (!storeUpc) {
        getUPC();
        } 
    }, [searchUPC, upcList, dispatch]);
    

    if(Object.keys(product).length === 0) {
        return (
            <div style={{marginTop: '40px'}}>That looks like an invalid UPC code.  Try another one!</div>
        )
    }
    return (   
        <> 
        <UpcProductDisplay displayUpc={product} />

        </>
    )
}
export default ProductDetails;