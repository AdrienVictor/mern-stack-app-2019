import React from 'react';
import { NavLink } from 'react-router-dom';

const Student = props => {
  const { name, country, age, bio, _id } = props.student;
  return (
    <tr>
      <td>{name}</td>
      <td>{country}</td>
      <td>{age}</td>
      {/* <td>{bio}</td> */}
      <tr>
        <NavLink to={`/students/${props.student._id}`} className='btn btn-secondary'>
          Detail
        </NavLink>{' '}
        <button className='btn btn-primary'>Edit</button>{' '}
        <button className='btn btn-danger'>Delete</button>
      </tr>
    </tr>
  );
};

Student.propTypes = {};

export default Student;
