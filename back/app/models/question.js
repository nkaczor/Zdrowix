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
    ref: 'User'
  },
  doctor: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User'
  },
  answer: {
    type: String
  },


},{
    timestamps: true
  }
);

module.exports = mongoose.model('Question', QuestionSchema);
