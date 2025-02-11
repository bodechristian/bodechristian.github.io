import React from 'react';
import { Link } from "react-router-dom";
import kl from './assets/pieces/Chess_klt60.png';


const Navbar = () => {
  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <nav className='navbar navbar-expand-lg'>
      <div className="container-fluid">
        <Link to="/">
          <h2 className='mb-0'>FFM</h2>
        </Link>
        <div className='d-block d-lg-none'>
          <button className='btn-navbar' onClick={() => setShowSidebar(!showSidebar)}>
            <img src={kl} alt='' style={{ height: "30px", width: "30px" }} />
          </button>
        </div>
        <div className="collapse navbar-collapse" style={{ display: showSidebar ? 'inline' : 'none' }} id="navbarSupportedContent">
          <ul className='navbar-list nav navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to="/kzCC" className='nav-link'>KZ-CC</Link>
            </li>
            <li className='nav-item'>
              <Link to="/kztourney" className='nav-link'>KZ-Final Act</Link>
            </li>
            <li className='nav-item'>
              <Link to="/wordle" className='nav-link'>Wordle</Link>
            </li>
            <li className='nav-item'>
              <Link to="/connections" className='nav-link'>Connections</Link>
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