const express = require('express');
const router = express.Router();
require('../models/mongoose/Packs');
require('../models/mongoose/Degrees');

const Skill = require('../models/mongoose/Skills');
const Degree = require('../models/mongoose/Degrees');
const Career = require('../models/mongoose/Careers');
const CareerTrait = require('../models/mongoose/CareerTraits');


// GET all degree information
router.get('/degree/findAll', async function (req, res) {
  // console.log('req.body =', req.body);
  // console.log('req.params =', req.params);
  // console.log('req.query =', req.query);
  try {
    const allDegree = await Degree.find()
      .populate({
        path: 'skills._id',
        select: 'packID',
        populate: {
          path: 'packID',
          model: 'Pack',
        }
      });
    res.status(200).json({
      message: 'success',
      data: allDegree,
    });

  } catch (err) {
    console.log('/api/degree/findAll, err =', err);
    res.status(400).send({
      message: 'bad request',
      data: err,
    });
  }
});

// GET all career information 
router.get('/career/findAll', async function (req, res) {
  // console.log('req.body =', req.body);
  // console.log('req.params =', req.params);
  // console.log('req.query =', req.query);

  try {
    const allCareer = await Career.find()
      .populate({
        path: 'packID',
        model: 'Pack',
      })
      .populate({
        path: 'branch.degreeID',
        model: 'Degree',
        populate: {
          path: 'branch.degreeID.skills',
          model: 'Skill',
        }
      });
    // console.log('allCareer =', allCareer); 
    res.status(200).json({
      message: 'success',
      data: allCareer,
    });

  } catch (err) {
    console.log('/api/career/findAll, err =', err);
    res.status(400).send({
      message: 'bad request',
      data: err,
    });
  }

});

// GET all skills Information.
router.get('/skills/findAll', async function (req, res) {

  try {
    const allSkills = await Skill.find()
      .populate('packID');
    res.status(200).json({
      message: 'success',
      data: allSkills,
    });

  } catch (err) {
    console.log('/api/skills/findAll, err =', err);
    res.status(400).send({
      message: 'bad request',
      data: err,
    });
  }

});

// GET all careerTraits
router.get('/careerTraits/findAll', async function (req, res) {

  try {
    let newCareerTraitArray = [];
    const careerTraitModel = await CareerTrait.find();
    // console.log('careerTraitModel =', careerTraitModel);

    for (let i = 0; i < careerTraitModel.length; i++) {

      let branchID = careerTraitModel[i].branchID;
      // console.log('careerTraitModel[i] =', careerTraitModel[i]);
      const careerBranch = await Career
        .find({ 'branch._id': `${branchID}` })
        .populate({
          path: 'packID',
          model: 'Pack',
        })
        .populate({
          path: 'branch.degreeID',
          model: 'Degree',
          populate: {
            path: 'branch.degreeID.skills',
            model: 'Skill',
          }
        });

      const branches = careerBranch[0].branch;
      const branch = branches.filter((b) => {
        if (b._id === `${branchID}`) {
          return true;
        } else { return false }
      });

      let fullTrait = {
        _id: careerTraitModel[i]._id,
        name: careerTraitModel[i].name,
        description: careerTraitModel[i].description,
        branch: {
          careerName: careerBranch[0].name,
          careerID: careerBranch[0]._id,
          branchID: careerTraitModel[i].branchID,
          branchName: branch[0].name,
          degreeID: careerBranch[0].branch[0].degreeID,
        }
      }

      newCareerTraitArray.push(fullTrait);

    }
    res.status(200).json({
      message: 'success',
      data: newCareerTraitArray,
    });

  } catch (err) {
    console.log('/careerTraits/findAll, err =', err);
    res.status(400).send({
      message: 'bad request',
      data: err,
    });
  }
});


module.exports = router;