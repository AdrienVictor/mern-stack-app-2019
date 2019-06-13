const express = require('express');
const studentRoute = express.Router();
const Student = require('../models/Student');

studentRoute.route('/').get((req, res) => {
  res.send('Mern Application');
});

studentRoute.route('/students').get((req, res) => {
  Student.find({}, (err, students) => {
    if (err) {
      return res.status(404).send('Not found');
    }
    res.json(students);
  });
});

studentRoute.get('/students/:id', (req, res) => {
  const id = req.params.id;
  Student.findOne({ _id: id }, (err, student) => {
    if (err) {
      return res.status(404).send('Not Found');
    }
    res.json(student);
  });
});

studentRoute.post('/student', (req, res) => {
  const body = req.body;
  console.log(body);

  res.send('post body');
});

studentRoute.post('/students', (req, res) => {
  const createdAt = new Date();
  req.body.createdAt = createdAt;
  const student = new Student(req.body);
  student
    .save()
    .then(st => {
      res.json(st);
    })
    .catch(err => console.log(err));
});

studentRoute.put('/students/edit/:id', (req, res) => {
  const _id = req.params.id;
  const { name, country, age, bio } = req.body;
  Student.findOne({ _id }, (err, student) => {
    if (err) {
      return res.status(400).send('Error');
    }
    student.name = name;
    student.country = country;
    student.age = age;
    student.bio = bio;
    student
      .save()
      .then(student => {
        res.send('edited');
      })
      .catch(error => console.log(error));
  });
});

studentRoute.delete('/students/:id', (req, res) => {
  const _id = req.params.id;
  Student.deleteOne({ _id }, (err, student) => {
    if (err) {
      return res.status(400).send('Error');
    }
    res.send('A student has been deleted');
  });
});

module.exports = studentRoute;
