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

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <Navbar />
          <Switch>
            <Route path='/add-students' component={AddStudents} />
            <Route path='/edit/:id' component={EditStudents} />
            <Route path='/students/:id' component={StudentDetail} />
            <Route path='/students' component={StudentList} />
            <Route path='/' component={LandingPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
