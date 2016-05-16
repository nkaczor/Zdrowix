var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RangeSchema = new Schema({
  start: {
    type: Number
  },
  end: {
    type: Number
  }
});

var DaySchema = new Schema({
  day: {
    type: String,
    required: true
  },
  ranges: [ RangeSchema ]
}, {
    timestamps: true
  });

var WorkingTimeSchema = new Schema({
  doctor: {
    type: Schema.ObjectId,
    required: true,
    unique: true,
  },
  workingHours: [
    DaySchema
  ]
},{
    timestamps: true
  }
);

module.exports = mongoose.model('WorkingTime', WorkingTimeSchema);
