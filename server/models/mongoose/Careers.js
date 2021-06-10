const mongoose = require('mongoose'); 
const {Schema} = mongoose;

const CareerSchema = new Schema({
  _id: {type: String},
  name: {type: String,},
  fullTime: {type: Boolean}, 
  packID: {
    type: String,
    ref: 'Pack',
  },
  imageURL: {type: String},
  branch: [{
    _id: {type: String,},
    name: {type: String}, 
    degreeID: {
      type: String,
      ref: 'Degree',
    },
  }], 
});

CareerSchema.virtual('branches', {
  ref: 'CareerTrait',
  localField: 'branch._id',
  foreignField: '_id',
  justOne: false,
});

CareerSchema.set('toObject', { virtuals: true });
CareerSchema.set('toJSON', { virtuals: true });

const Career = mongoose.model('Career', CareerSchema, 'Career'); 

module.exports = Career; 