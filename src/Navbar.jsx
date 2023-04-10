import React from 'react';
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg'>
      <div className="container-fluid">
        <Link to="/">
          <h2 className='mb-0'>FFM's Page</h2>
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className='navbar-list nav navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to="/" className='nav-link'>Home</Link>
            </li>
            <li className='nav-item'>
              <Link to="/kztourney" className='nav-link'>KZ</Link>
            </li>
            <li className='nav-item'>
              <Link to="/wordle" className='nav-link'>Wordle</Link>
            </li>
            <li className='nav-item'>
              <Link to="/video" className='nav-link'>Video</Link>
            </li>
            <li className='nav-item'>
              <Link to="/recordings" className='nav-link'>Recordings</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;