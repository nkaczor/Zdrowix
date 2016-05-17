var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpecialtySchema = new Schema({
  name: {
    type: String,
    required: true
  }
},{
    timestamps: true
  }
);

module.exports = mongoose.model('Specialty', SpecialtySchema);
