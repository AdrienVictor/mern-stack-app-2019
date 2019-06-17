import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Student = props => {
  const { name, country, age, bio, _id } = props.student;

  const deleteStudent = id => {
    const url = `/api/v1.0/students/${id}`;
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      axios
        .delete(url)
        .then(response => {
          console.log(response);
          this.props.history.push('/students');
        })
        .catch(error => console.log(error));
      window.location.replace('/students');
    }
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{country}</td>
      <td>{age}</td>
      {/* <td>{bio}</td> */}
      <tr>
        <NavLink to={`/students/${props.student._id}`} className='btn btn-secondary mx-2'>
          Detail
        </NavLink>{' '}
        <NavLink to={`/edit/${props.student._id}`} className='btn btn-primary mx-2'>
          Edit
        </NavLink>{' '}
        <button
          className='btn btn-danger mx-2'
          onClick={() => deleteStudent(props.student._id)}
        >
          Delete
        </button>
      </tr>
    </tr>
  );
};

Student.propTypes = {};

export default Student;
