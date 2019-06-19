const express = require('express');
const userRoute = express.Router();
const User = require('../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

userRoute.get('/', (req, res) => {
  res.send('Welcome user');
});

userRoute.post('/signup', (req, res) => {
  const { name, userName, email, password } = req.body;
  const errors = {};
  const avatar = gravatar.url(email, { s: '100', r: 'x', d: 'retro' }, true);

  User.findOne({ email }, (err, user) => {
    if (user) {
      errors.email = 'email already taken';
      return res.json(errors);
    }
    const newUser = new User({ name, userName, email, password, avatar });

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in your password DB.
        if (err) {
          return res.status(400).send('Password issue');
        }
        newUser.password = hash;

        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
  //   res.send('user was created');
});

userRoute.post('/signin', (req, res) => {
  const errors = {};
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (!user) {
      errors.email = 'Email does not exist';
      return res.json(errors);
    } else {
      bcrypt.compare(password, user.password, function(err, isMatch) {
        // isMatch === true
        if (isMatch) {
          const payload = {
            id: user._id,
            name: user.name,
            userName: user.userName,
            email: user.email,
            avatar: user.avatar
          };
          const key = 'secretKey';

          jwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
            return res.json(token);
          });
        } else {
          errors.password = 'incorrect password';
          return res.json(errors);
        }
      });
    }
  });
});

module.exports = userRoute;
