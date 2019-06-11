import React from 'react';
import { NavLink } from 'react-router-dom';

const Index = props => {
  return (
    <div className='jumbotron'>
      <NavLink to='/students' className='center'>
        Go to the students page
      </NavLink>
    </div>
  );
};

export default Index;
