var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var specialtySchema = new Schema({
  name: {
    type: String,
    required: true
  }
},{
    timestamps: true
  }
);

module.exports = mongoose.model('Specialty', specialtySchema);
