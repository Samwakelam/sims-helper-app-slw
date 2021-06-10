const mongoose = require('mongoose'); 
const Career = require('./Careers');
const {Schema} = mongoose;

const CareerTraitSchema = new Schema({
  _id: {type: String},
  name: {type: String},
  description: {type: String}, 
  branchID: {
    type: String,
    ref: 'Career',
  },
});

// CareerTraitSchema.set('toObject', { virtuals: true });
// CareerTraitSchema.set('toJSON', { virtuals: true });

const CareerTrait = mongoose.model('CareerTrait', CareerTraitSchema, 'CareerTrait'); 

module.exports = CareerTrait;

