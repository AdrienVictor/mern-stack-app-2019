import React, { Component } from 'react';
import axios from 'axios';

export default class AddStudents extends Component {
  state = {
    name: '',
    country: '',
    age: '',
    bio: ''
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post('/api/v1.0/students/', this.state)
      .then(response => {
        this.props.history.push('/students');
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({
      name: '',
      country: '',
      age: '',
      bio: ''
    });
  };

  render() {
    const { name, country, age, bio } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div class='form-group'>
          <label for='name'>Name</label>
          <input
            name='name'
            type='name'
            class='form-control'
            placeholder='Enter Name'
            value={name}
            onChange={this.handleChange}
          />
        </div>

        <div class='form-group'>
          <label for='country'>Country</label>
          <input
            name='country'
            type='text'
            class='form-control'
            placeholder='Enter Country'
            value={country}
            onChange={this.handleChange}
          />
        </div>

        <div class='form-group'>
          <label for='age'>Age</label>
          <input
            name='age'
            type='number'
            class='form-control'
            placeholder='Enter Age'
            value={age}
            onChange={this.handleChange}
          />
        </div>

        <div class='form-group'>
          <label for='bio'>Bio</label>
          <textarea
            name='bio'
            name='bio'
            class='form-control'
            placeholder='Enter Bio'
            value={bio}
            onChange={this.handleChange}
          />
        </div>

        <button class='btn btn-primary' type='submit'>
          Add Student
        </button>
      </form>
    );
  }
}
