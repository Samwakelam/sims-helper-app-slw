const mongoose = require('mongoose'); 
const {Schema} = mongoose;

const SkillsSchema = new Schema({
  _id: {type: String},
  name: {type: String},
  packID: {
    type: String,
    ref: 'Pack',
  },
});

const Skill = mongoose.model('Skill', SkillsSchema, 'Skill'); 

module.exports = Skill; 