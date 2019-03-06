// const User = require('../models/user');
// const controller = require('../controllers/user');
// const router = require('express').Router();
//
// console.log(controller)
//
// router.route('/login')
//     .get((req, res) => {
//         // condition ? action(true, do this) : action(false, do this)
//         req.user ? res.redirect('/dashboard') : res.render('login');
//     })
//     .post((req, res) => {
//         const body = req.body
//         console.log("req.body:", req.body);
//         //get the form of email and password : login func returns a token
//         controller.login(body).then((token) => {
//             console.log('toke--> ', token)
//             res.status(200).json({token});
//             // return res.status(200).send({message: 'User successfully logged in'});
//         }).catch(err => {
//             console.log(err)
//             return res.status(401).send({error: err.message});
//         });
//     });
//
//
// router.route('/signup')
//     .get((req, res) => {
//         res.render('signup');
//     })
//     .post((req, res) => {
//         const body = req.body;
//         console.log("requesting the body: ", body);
//         controller.signup(body).then((token) => {
//             res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
//             return res.status(200).send({message: 'Successfully created an account'});
//         }).catch(err => {
//             console.log('THIS IS AN ERROR: ', err);
//             return res.status(400).send({message: 'Please fill in the forms correctly'});
//         });
//     });
//
// module.exports = users;
