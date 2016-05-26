var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/

// set up a mongoose model
var UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
  },
  email:  {
    type: String,
    unique: true,
    required: true
  },
  avatar:  {
     type: String,
  },
  type: {
    required: true,
    type: String,
    enum: ['patient', 'doctor']
  },
  specialty: {
    type: Schema.ObjectId,
    ref: 'Specialty'
  },
  voivodeship: {
    type: Schema.ObjectId,
    ref: 'Voivodeship',
  },
  password: {
    select: false,
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  phoneNumber: {
    type: String,
  }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, schema, cb) {
  schema.findOne({email: this.email}).select('password').exec(function (err, user) {
    bcrypt.compare(passw, user.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
  });

};

var User = mongoose.model('User', UserSchema);

module.exports = User;