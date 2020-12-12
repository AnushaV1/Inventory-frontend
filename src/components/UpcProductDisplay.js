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
<div className="jumbotron">

<div><h3 className="display-5">{displayUpc.title}</h3> - <h4>UPC - {displayUpc.upc}</h4></div>
<span className="lead left-half"><strong>Category:{displayUpc.category}</strong></span>
<div>
<div className="lead left-half"><strong>Brand:{displayUpc.brand}</strong> <span className="lead clear-left"><strong>Model: {displayUpc.model}</strong></span>
<span className="lead clear-left"><strong>Color:{displayUpc.color}</strong></span> <span className="lead clear-left"><strong>Dimension: ${displayUpc.dimension}</strong></span>  </div>
</div>

<hr className="clear" />
<p className="lead left-half">{displayUpc.description}</p>

</div>
            </div>
            <span className="image"><img src={displayUpc.image_link|| defaultLogo} alt={displayUpc.title} /></span>
        </div>

        </>
        )
    }

export default UpcProductDisplay;