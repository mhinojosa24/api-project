const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    fullName: { type: String },
    email: { type: String },
    password: { type: String }
}, {
    timestamps: true
});


UserSchema.pre("save", function(next) {

    // ENCRYPT password
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        }); // ends bcrypt
    }); // end UserSchema
});

module.exports = mongoose.model("User", UserSchema);
