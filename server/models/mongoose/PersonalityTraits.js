const mongoose = require('mongoose'); 
const {Schema} = mongoose;

const PersonalityTraitsSchema = new Schema({
  _id: {type: String},
  type: {type:String},
  traits: [{
    _id: {type: String},
    name: {type: String},
    packID: {
      type: String,
      ref: 'Pack',
    },
    imageURL: {type: String},
    description: {type: String},
    aspiratiion: {type: String},
  }],
});

const PersonalityTrait = mongoose.model('PersonalityTrait', PersonalityTraitsSchema, 'PersonalityTrait'); 

module.exports = PersonalityTrait; 