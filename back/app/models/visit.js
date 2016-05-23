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
    type: Schema.ObjectId
  },
  patient: {
    required: true,
    type: Schema.ObjectId
  }
},{
    timestamps: true
  }
);

module.exports = mongoose.model('Visit', VisitSchema);
