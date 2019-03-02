const jwt  = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

function login(body) {
    return new Promise(async (resolve, reject) => {
        // const email = body.email;
        // const password = body.password;
        const {email, password } = body;
        const user = await User.findOne({email}, "email password");
        if (!user) {
            reject('Wrong email or password');
        } else {
            user.comparePassword(password, (err, isMatch) => {
                if (!isMatch) {
                    reject('wrong password');
                } else {
                    const token = jwt.sign({_id: user._id, email: user.email}, process.env.SECRET, { expiresIn: "60 days" });
                    resolve(token);
                }
            });
        };
    }).catch();
};

module.exports = {
    login: login
}
