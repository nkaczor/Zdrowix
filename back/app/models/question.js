var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  author: {
    type: Schema.ObjectId,
  },
  doctor: {
    type: Schema.ObjectId,
    required: true
  },
  answer: {
    type: String
  },

},{
    timestamps: true
  }
);

module.exports = mongoose.model('Question', QuestionSchema);
