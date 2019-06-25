import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';
import StudentList from './components/StudentList';
import AddStudents from './components/AddStudents';
import EditStudents from './components/EditStudents';
import Navbar from './components/Navbar';
import LandingPage from './components/Index';
import StudentDetail from './components/StudentDetail';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import PrivateRoute from './components/PrivateRoute';
import setAuthHeader from './shared/setAuthHeader';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// if (localStorage.jwtToken) {
//   setAuthHeader(localStorage.jwtToken);
//   const currentUser = jwtDecode(localStorage.jwtToken);
//   console.log(currentUser);
// }

class App extends Component {
  state = {
    auth: {
      isAuthenticated: false,
      currentUser: {}
    },
    errors: {}
  };

  loginUser = (data, history) => {
    axios
      .post('/api/v1.0/users/signin', data)
      .then(response => {
        const token = response.data.token;
        const currentUser = jwtDecode(token);

        setAuthHeader(token);
        localStorage.setItem('jwtToken', token);
        this.setState({
          auth: { ...this.state.auth, isAuthenticated: true, currentUser: currentUser }
        });

        history.push('/');
      })
      .catch(error => {
        console.log(error.response.data);
        const errors = error.response.data;
        this.setState({
          errors: errors
        });
        console.log(this.state);
      });
  };

  logoutUser = () => {
    localStorage.removeItem('jwtToken');
    setAuthHeader(false);
    this.setState({
      auth: { ...this.state.auth, isAuthenticated: false, currentUser: {} }
    });
    window.location.href = '/login';
  };

  render() {
    const { auth, errors } = this.state;
    return (
      <BrowserRouter>
        <div className='container'>
          <Navbar auth={auth} logoutUser={this.logoutUser} />
          <Switch>
            <PrivateRoute auth={auth} path='/add-students' component={AddStudents} />
            <PrivateRoute auth={auth} path='/edit/:id' component={EditStudents} />
            <Route path='/students/:id' component={StudentDetail} />
            <Route path='/students' component={StudentList} />
            <Route path='/signup' component={Signup} />
            <Route
              path='/signin'
              component={props => (
                <Signin {...props} loginUser={this.loginUser} errors={errors} />
              )}
            />
            <PrivateRoute auth={auth} path='/' component={LandingPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
