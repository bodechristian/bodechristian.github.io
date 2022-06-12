import React from 'react';

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
                            <li><a href="/">Home</a></li>
                            <li><a href="/wordle">Wordle</a></li>
                            <li><a href="/vid">Video</a></li>
                            <li><a href="/recordings">Recordings</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
            
        </footer>
    );
};
export default Footer;