const mongoose = require('mongoose'); 
const {Schema} = mongoose;

const BranchSchema = new Schema({
  _id: {type: String},
  name: {type: String,},
  careerID: {type: String},
  traitID: {type: String},
  degreeID: {
    type: String,
    ref: 'Degree',
  },
});

const Branch = mongoose.model('Branch', BranchSchema, 'Branch');

module.exports = Branch;