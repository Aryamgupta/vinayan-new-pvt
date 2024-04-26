import React from 'react'
import vinayanlogo from '../../../Images/vinayanlogo 1.png';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const Navbar = () => {

  return (
    <div className='mainNavBar'>
      <img src={vinayanlogo}/>
     <div className='allLinks'>
     <NavLink to="/dashboard" 
     className={({ isActive }) => (isActive ? 'navLinkk-selected' : 'navLinkk')}>
        Dashboard
        </NavLink>
        <NavLink to="/records" className={({ isActive }) => (isActive ? 'navLinkk-selected' : 'navLinkk')}>
        Records
        </NavLink>
        <NavLink to="/confriguations" className={({ isActive }) => (isActive ? 'navLinkk-selected' : 'navLinkk')}>
        Confriguations
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'navLinkk-selected' : 'navLinkk')}>
        Profile
        </NavLink>
     </div>
    </div>
  )
}

export default Navbar
