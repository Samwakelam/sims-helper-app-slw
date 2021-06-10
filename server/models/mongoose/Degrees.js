const mongoose = require('mongoose'); 
const {Schema} = mongoose;

const DegreeSchema = new Schema({
  _id: {type: String},
  name: {type: String}, 
  imageURL: {type: String},
  description: {type: String},
  skills:[{
    _id: {
      type: String,
      ref: 'Skill',
    },
    name: {type: String},
    coreSkill: {type: Boolean},
  }],
  uni: [{
    name: {type: String},
    isHons: {type: Boolean},
  }],
  career:[{type: String}],
  
}); 

const Degree = mongoose.model('Degree', DegreeSchema, 'Degree'); 

module.exports = Degree; 