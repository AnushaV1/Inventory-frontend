import React from 'react';
import './UpcProductDisplay.css';
import defaultLogo from "../images/default-no-image.png";

function UpcProductDisplay({ displayUpc }) {

    if(!displayUpc) {
        return(
            <div>No product </div>
        )
    }
	return (
        <>
        <div className="spotlight">
        <div className="content">  
        <div className="container mt-3">
    <div className="row">
    <div className="col-sm"><h4 className="display-5">{displayUpc.title} </h4></div>
    <div className="col-sm"><h4>UPC - {displayUpc.upc_code}</h4></div>
    </div>
    
    <div className="row">
    <div className="col-sm"><span className="lead left-half"><strong>Category:{displayUpc.category}</strong></span></div>
    </div>
    <div className="row">
    <div className="col-sm"><span><strong>Brand:{displayUpc.brand}</strong></span></div>
    <div className="col-sm"><span><strong>Model: {displayUpc.model}</strong></span></div>
    <div className="col-sm"><span><strong>Color:{displayUpc.color}</strong></span></div>
    <div className="col-sm"><span><strong>Dimension: ${displayUpc.dimension}</strong></span></div>
    </div>

    <hr className="clear" />
    <div className="row">
    <div className="col-sm"><span>{displayUpc.description}</span></div>
    </div>
</div>              

            </div>
            <span className="image"><img src={displayUpc.image_link|| defaultLogo} alt={displayUpc.title} /></span>
        </div>

        </>
        )
    }

export default UpcProductDisplay;

