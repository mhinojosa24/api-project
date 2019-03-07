const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = require('express').Router();

// Sign up
router.get('/signup', (req, res) => {
  res.render('signup');
});


// Sign up
router.post('/signup', (req, res) => {
  const email = req.body.email;
  console.log("email:", email);
  User.findOne({email}).then((user) => {
      console.log("user got;", user);
    if (user) {
      return res.status(401).send('User with this email already exist.');
    } else {
      const user = new User(req.body);
      user.save().then((user) => {
        const token = jwt.sign({_id: user._id}, process.env.SECRET, {
          expiresIn: '60 days'});
        res.cookie('nToken', token, {maxAge: 900000, httpOnly: true});
        return res.status(200)
            .send({message: 'Successfully created an account'});
      }).catch((error) => {
        console.log('this is an error: ', error);
        return res.status(400).send({
          message: 'Please fill in the forms correctly'});
      });
    }
  });
});


// Login
router.get('/login', (req, res) => {
  res.render('login');
});

// Login
router.post('/login', (req, res) => {
  console.log('req.body', req.body);
  const {email, password} = req.body;


  User.findOne({email}).then((user) => {
    console.log('user:', user);
    if (user === null) {
      // user not found
      return res.status(401).send({message: 'Wrong email or password'});
    } else {
      console.log('in else');
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          return res.status(401).send({message: 'Wrong email or password'});
        }
        // create a token
        const token = jwt.sign({_id: user._id, email: user.email},
            process.env.SECRET, {expiresIn: '60 days'});
        console.log('token:', token);
        res.cookie('nToken', token, {maxAge: 900000, httpOnly: true});
        return res.status(200).send('You successfully logged in');
      });
    }
  }).catch((err) => {
    console.log(err.message);
    return res.status(500).send({message: 'Something went wrong, try again.'});
  });
});


module.exports = router;
