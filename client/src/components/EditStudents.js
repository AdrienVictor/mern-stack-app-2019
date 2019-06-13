import React, { Component } from 'react';
import axios from 'axios';

export default class EditStudents extends Component {
  state = {
    name: '',
    country: '',
    age: '',
    bio: ''
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    const url = `/api/v1.0/students/${id}`;
    axios
      .get(url)
      .then(response => {
        const { name, country, age, bio } = response.data;
        this.setState({ name, country, age, bio });
      })
      .catch(error => console.log(error));
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const url = `/api/v1.0/students/edit/${id}`;
    axios
      .put(url, this.state)
      .then(response => {
        this.props.history.push('/students');
      })
      .catch(error => console.log(error));
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
          Edit Student
        </button>
      </form>
    );
  }
}
