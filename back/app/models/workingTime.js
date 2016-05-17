var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var WorkingTimeSchema = new Schema({
  doctor: {
    type: Schema.ObjectId,
    required: true,
    unique: true,
  },
  workingHours: {
    monday: {
      type: [{
        type: Boolean,
        ref: 'mondayModel'
      }],
      validate: [arrayLimit, '{PATH} is not of length 24']
    },
    tuesday: {
      type: [{
        type: Boolean,
        ref: 'tuesdayModel'
      }],
      validate: [arrayLimit, '{PATH} is not of length 24']
    },
    wednesday: {
      type: [{
        type: Boolean,
        ref: 'wednesdayModel'
      }],
      validate: [arrayLimit, '{PATH} is not of length 24']
    },
    thursday: {
      type: [{
        type: Boolean,
        ref: 'thursdayModel'
      }],
      validate: [arrayLimit, '{PATH} is not of length 24']
    },
    friday: {
      type: [{
        type: Boolean,
        ref: 'fridayModel'
      }],
      validate: [arrayLimit, '{PATH} is not of length 24']
    },
    saturday: {
      type: [{
        type: Boolean,
        ref: 'saturdayModel'
      }],
      validate: [arrayLimit, '{PATH} is not of length 24']
    },
    sunday: {
      type: [{
        type: Boolean,
        ref: 'sundayModel'
      }],
      validate: [arrayLimit, '{PATH} is not of length 24']
    }
  }
},{
    timestamps: true
  }
);

function arrayLimit(val) {
  return val.length == 24;
}
module.exports = mongoose.model('WorkingTime', WorkingTimeSchema);
