import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className='footer py-3'>
            <div className="container text-center">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-3">
                        <h5 className="h1 text-white">Bode</h5>
                        <p className="small text-muted">A small random website that is used for practice working on websites.</p>
                    </div>
                    <div className="col-md-3">
                        <h5 className="text-white mb-3">Quick links</h5>
                        <ul className="list-unstyled text-muted mb-0">
                            <li className='nav-item nav-item-footer'>
                                <Link to="/" className='nav-link'>Home</Link>
                            </li>
                            <li className='nav-item nav-item-footer'>
                                <Link to="/wordle" className='nav-link'>Wordle</Link>
                            </li>
                            <li className='nav-item nav-item-footer'>
                                <Link to="/video" className='nav-link'>Video</Link>
                            </li>
                            <li className='nav-item nav-item-footer'>
                                <Link to="/recordings" className='nav-link'>Recordings</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
            
        </footer>
    );
};
export default Footer;