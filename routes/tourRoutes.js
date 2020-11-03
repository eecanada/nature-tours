const express = require('express');
const tourController = require('./../controllers/toursController')
 
const router = express.Router();

//val holds the value of the id parameter, creating my own custome route id
//params middleware:only runs for certain parameters
// router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
