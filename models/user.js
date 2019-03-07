const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: {type: String},
  email: {type: String},
  password: {type: String},
  tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
}, {
  timestamps: true,
});


UserSchema.pre('save', function(next) {
  // ENCRYPT password
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    }); // ends bcrypt
  }); // end UserSchema
});

UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
