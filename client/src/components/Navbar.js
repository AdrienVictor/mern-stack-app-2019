import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = props => {
  const { auth, logoutUser } = props;
  const { currentUser } = auth;
  const { name, avatar } = currentUser;
  if (auth.isAuthenticated) {
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <NavLink className='navbar-brand' to='/'>
          MERN APP
        </NavLink>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <NavLink className='nav-link' to='/students'>
                Students
              </NavLink>
            </li>

            <li className='nav-item'>
              <NavLink className='nav-link' to='/add-students'>
                Add Students
              </NavLink>
            </li>

            <li className='nav-item'>
              {name}
              <img src={avatar} alt={name} />
            </li>

            <li className='nav-item'>
              <button onClick={props.logoutUser} className='nav-link'>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  return <h3 className='text-center'>MERNIFIED APP</h3>;
};

Navbar.propTypes = {};

export default Navbar;
