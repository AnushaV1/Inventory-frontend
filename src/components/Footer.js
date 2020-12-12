import React from 'react';
import './Footer.css'

const Footer = () => {
	return (
		<footer className="footer">
		<div className="container-fluid text-center">
        <div className="row">
			<div className="col-md-4 mt-md-0 mt-3 text-left">
			<h5><a href="https://www.upcitemdb.com/api/explorer#!/lookup/get_trial_lookup" className="text-white-50">API - UPCItemDB </a></h5>
            </div>
			<div className="col-md-4 mb-md-0 mb-3 ">
			<h5 className="text-white-50">Springboard Capstone project 2</h5>
		</div>

            <div className="col-md-4 mb-md-0 mb-3 text-center">
            <h4> <a href="http://www.linkedin.com/in/anusha-venkataraghavan" className="text-white-50"><i className="fab fa-linkedin"></i></a></h4>
			</div>

		</div>
        </div>
    </footer>
	);
};

export default Footer;

