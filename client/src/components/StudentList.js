import React, { Component } from 'react';
import axios from 'axios';
import Student from './Student';

export default class StudentList extends Component {
  state = { students: [] };

  componentDidMount() {
    const apiUrl = '/api/v1.0/students/';
    axios.get(apiUrl).then(response => {
      this.setState({
        students: response.data
      });
    });
  }

  refreshAfterDel = () => {
    console.log('refresh worked');
    const apiUrl = '/api/v1.0/students/';
    axios.get(apiUrl).then(response => {
      this.setState({
        students: response.data
      });
    });
  };

  renderStudentsList = () => {
    const students = this.state.students;
    return students.map(student => (
      <Student refresh={this.refreshAfterDel} key={student._id} student={student} />
    ));
  };

  render() {
    return (
      <div>
        <h3>Numbers student:{this.state.students.length}</h3>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderStudentsList()}</tbody>
        </table>
      </div>
    );
  }
}
