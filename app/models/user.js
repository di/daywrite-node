var mongoose = require('mongoose');
var passwordHash = require('password-hash');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  stripe_id: { type: String, default: '' },
  confirmed: { type: Boolean, default: false },
  confirmed_at: { type: Date },
  registered: { type: Boolean, default: false },
  invited: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  email_hash: { type: String, default: '' },
  timezone: { type: String, default: 'US/Eastern' },
  has_archive: { type: Boolean, default: false }
});


UserSchema.path('email').validate(function (email) {
  return email.length;
}, 'Email cannot be blank');

UserSchema.path('email').validate(function (email, fn) {
  var User = mongoose.model('User');

  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('email')) {
    User.find({ email: email }).exec(function (err, users) {
      fn(!err && users.length === 0);
    });
  } else fn(true);
}, 'Email already exists');

UserSchema.path('password').validate(function (password) {
  return password.length;
}, 'Password cannot be blank');

UserSchema.methods = {

  authenticate: function (plainText) {
    return passwordHash.verify(plainText, this.password);
  },

  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return passwordHash.generate(password)
    } catch (err) {
      return '';
    }
  },
};

mongoose.model('User', UserSchema, "user");
