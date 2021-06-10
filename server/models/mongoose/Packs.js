const mongoose = require('mongoose'); 
const {Schema} = mongoose;

const PackSchema = new Schema({
  _id: {type: String},
  name: {type: String,},
  type: {type: String,}
});

const Pack = mongoose.model('Pack', PackSchema, 'Pack');

module.exports = Pack;