// const fs = require('fs')
const { findById } = require('./../models/tourModel');
const Tour = require('./../models/tourModel')

// //JSON parse turns json object to javascript object 
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// custom middleware function
// exports.checkID = (req, res, next, val) => {
//   console.log(`tour id is ${val}`);
//   if (req.params.id > tours.length) {
//     return res.status(404).json({
//       status: 'failed',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

// custom middleware function
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'failed',
//       message: 'Missing property',
//     });
//   }
//   next();
// };

// ROUTE HANDLERS
exports.getAllTours = async (req, res) => {
  try{
    const tours = await Tour.find()
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours, // this is the tours simple
      },
    });
  } catch(err){
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
};

exports.getTour = async (req, res) => {
  try{
    const tour = await Tour.findOne({_id: req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour
      }
    })
  } catch(err){
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
};

exports.createTour = async (req, res) => {
 try {
  const newTour =  await Tour.create(req.body)
  res.status(201).json({
    status: 'success',
    data: {
      tours: newTour,
    },
  });
 } catch (err){
  res.status(400).json({
    status: 'fail',
    message: err 
  })
 }  
};

exports.updateTour = async (req, res) => {
  try{
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true 

    })
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }, 
    });
  } catch(err){
    res.status(400).json({
      status:'fail',
      message: err
    })
  }
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
