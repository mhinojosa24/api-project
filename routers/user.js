const User = require('../models/user');
const controller = require('../controllers/user');
const users = require('express').Router();

console.log(controller)

users.route('/login')
    .get((req, res) => {
        // condition ? action(true, do this) : action(false, do this)
        req.user ? res.redirect('/dashboard') : res.render('login');
    })
    .post((req, res) => {
        const body = req.body;
        console.log("req.body:", req.body);
        //get the form of email and password : login func returns a token
        controller.login(body).then((token) => {
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
            return res.status(200).send({message: 'user successfully logged in'});
        }).catch(err => {
            return res.status(401).send({message: 'Email or password incorrect'});
        });
    });

module.exports = users;
