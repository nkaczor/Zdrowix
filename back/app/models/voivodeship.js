var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoivodeshipSchema = new Schema({
  name: {
    type: String,
    required: true
  }
},{
    timestamps: true
  }
);

module.exports = mongoose.model('Voivodeship', VoivodeshipSchema);
