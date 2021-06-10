const mongoose = require('mongoose'); 
const {Schema} = mongoose;

const SimSchema = new Schema({
  _id: {type: String},
  name: { type: String },
  gender: { type: String },
  bio: { type: String },

  family:[
    {
      name: { 
        type: String,
        ref: 'Sim'
      },
      relation: { type: String },
    },
  ],

  aspirationCurrent: [
    {
      name: { type: String },
    }
  ],

  aspirationComplete: [
    {
      name: { type: String },
    }
  ],

  traits: [
    {
      _id: {type: String},
      name: { type: String },
    },
  ],

  career: {
    _id: { 
      type: String,
      ref: 'Career'
    },
    name: { type: String },
    level: {
      type: Number,
    },
    jobTitle: { type: String },
    goals: { type: String },
  },

  otherSims: [{
    name: { 
      type: String,
      ref: 'Sim',
    },
    relation: { type: String },
  }],

  tasks: [{
    name: { type: String },
    status: { type: String },
  }],

  skills: [
    {
      _id: {type: String},
      name: { type: String},
      level: { type: Number}
    }
  ],

  degree: {
    _id: {type: String},
    name: {type: String},
  },
   
});

const Sim = mongoose.model('Sim', SimSchema, 'Sim');

module.exports = Sim ;