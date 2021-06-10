// package
import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faHome, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
// styles
import './Nav.css';

const Navbar = () => {

  const location = useLocation();
  // console.log('location =', location);
  const locationSplit = location.pathname.split('/');
  const page = locationSplit[1];
  // console.log('page =', page );

  return(
    <nav>
      <img
        src={`${process.env.PUBLIC_URL}/assets/branding/logo-round.jpg`}
        alt='sim probable'
        className='logo'
      />
      <ul className='nav'>
        <li className={`inline nav-item ${page === '' ? 'active pushed' : 'raised' } `} ><NavLink exact to='/'><FontAwesomeIcon icon={faHome} /></NavLink></li>
        <li className={`inline nav-item ${page === 'careers' ? 'active pushed' : 'raised' } `} ><NavLink to='/careers'><FontAwesomeIcon icon={faBriefcase} /></NavLink></li>
        <li className={`inline nav-item ${page === 'degrees' ? 'active pushed' : 'raised' } `} ><NavLink to='/degrees'><FontAwesomeIcon icon={faGraduationCap} /></NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar; 