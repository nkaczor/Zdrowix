var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VisitSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  hour: {
    type: Number,
    required: true
  },
  doctor: {
    required: true,
    type: Schema.ObjectId,
    ref: 'User'
  },
  patient: {
    required: true,
    type: Schema.ObjectId,
    ref: 'User'
  }
},{
    timestamps: true
  }
);

module.exports = mongoose.model('Visit', VisitSchema);
