const mongoose = require('mongoose');
const { Schema } = mongoose;

const ScholarshipSchema = new Schema({
  _id: { type: String },
  type: { type: String, },
  scholarships: [{
    _id: { type: String },
    name: { type: String },
    funding: { type: Number },
    skills: [
      {
        type: String,
        ref: 'Skill',
      },
    ],
    requirements: [{ type: String }],
  }],
});

const Scholarship = mongoose.model('Scholarship', ScholarshipSchema, 'Scholarship');

module.exports = Scholarship;