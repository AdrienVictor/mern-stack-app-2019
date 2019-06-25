import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const styles = {
  color: 'brown'
};

class Signin extends Component {
  state = {
    email: '',
    password: ''
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.loginUser(this.state, this.props.history);
  };
  render() {
    const { errors } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div class='form-group'>
          <label for='email'>Email</label>
          <input
            type='email'
            name='email'
            class='form-control is-invalid'
            placeholder='Email'
            value={this.state.age}
            onChange={this.handleChange}
          />
          <p class='invalid-feedback'>{errors.email} </p>
        </div>
        <div class='form-group'>
          <label for='password'>Password</label>
          <input
            type='password'
            name='password'
            class='form-control is-invalid'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          <p class='invalid-feedback'>{errors.password} </p>
        </div>
        <button class='btn btn-primary' type='submit'>
          Sign In
        </button>{' '}
        <NavLink to='/signup' className='btn btn-secondary'>
          Sign Up{' '}
        </NavLink>
      </form>
    );
  }
}

export default Signin;
